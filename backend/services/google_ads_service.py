"""
Google Ads API Service for Shopping Campaigns
Provides functionality to create and manage Shopping campaigns
"""

import os
import logging
from typing import List, Optional
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

logger = logging.getLogger(__name__)

# Load credentials from environment
GOOGLE_ADS_CONFIG = {
    "developer_token": os.environ.get("GOOGLE_ADS_DEVELOPER_TOKEN", ""),
    "client_id": os.environ.get("GOOGLE_OAUTH_CLIENT_ID", ""),
    "client_secret": os.environ.get("GOOGLE_OAUTH_CLIENT_SECRET", ""),
    "refresh_token": os.environ.get("GOOGLE_ADS_REFRESH_TOKEN", ""),  # Needs OAuth flow
    "login_customer_id": os.environ.get("GOOGLE_ADS_MANAGER_ID", "").replace("-", ""),
    "use_proto_plus": True,
}

CUSTOMER_ID = os.environ.get("GOOGLE_ADS_CUSTOMER_ID", "").replace("-", "")
MERCHANT_CENTER_ID = int(os.environ.get("GOOGLE_MERCHANT_CENTER_ID", "0"))


class GoogleAdsService:
    """Service class for Google Ads API interactions"""
    
    def __init__(self):
        self.client = None
        self.is_configured = self._check_configuration()
        
    def _check_configuration(self) -> bool:
        """Check if all required credentials are configured"""
        required = ["developer_token", "client_id", "client_secret"]
        for key in required:
            if not GOOGLE_ADS_CONFIG.get(key):
                logger.warning(f"Missing Google Ads config: {key}")
                return False
        return True
    
    def _initialize_client(self) -> Optional[GoogleAdsClient]:
        """Initialize Google Ads API client"""
        if not self.is_configured:
            logger.error("Google Ads not properly configured")
            return None
            
        if not GOOGLE_ADS_CONFIG.get("refresh_token"):
            logger.warning("No refresh token - OAuth flow required")
            return None
            
        try:
            client = GoogleAdsClient.load_from_dict(GOOGLE_ADS_CONFIG)
            logger.info("Google Ads client initialized successfully")
            return client
        except Exception as e:
            logger.error(f"Failed to initialize Google Ads client: {e}")
            return None
    
    def get_oauth_url(self, redirect_uri: str) -> str:
        """Generate OAuth authorization URL"""
        from google_auth_oauthlib.flow import Flow
        
        flow = Flow.from_client_config(
            {
                "web": {
                    "client_id": GOOGLE_ADS_CONFIG["client_id"],
                    "client_secret": GOOGLE_ADS_CONFIG["client_secret"],
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                }
            },
            scopes=["https://www.googleapis.com/auth/adwords"]
        )
        flow.redirect_uri = redirect_uri
        
        auth_url, _ = flow.authorization_url(
            access_type="offline",
            include_granted_scopes="true",
            prompt="consent"
        )
        
        return auth_url
    
    def exchange_code_for_tokens(self, code: str, redirect_uri: str) -> dict:
        """Exchange authorization code for tokens"""
        from google_auth_oauthlib.flow import Flow
        
        flow = Flow.from_client_config(
            {
                "web": {
                    "client_id": GOOGLE_ADS_CONFIG["client_id"],
                    "client_secret": GOOGLE_ADS_CONFIG["client_secret"],
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                }
            },
            scopes=["https://www.googleapis.com/auth/adwords"]
        )
        flow.redirect_uri = redirect_uri
        
        flow.fetch_token(code=code)
        credentials = flow.credentials
        
        return {
            "access_token": credentials.token,
            "refresh_token": credentials.refresh_token,
            "token_uri": credentials.token_uri,
            "expiry": credentials.expiry.isoformat() if credentials.expiry else None
        }
    
    def get_account_info(self) -> dict:
        """Get Google Ads account information"""
        if not self.client:
            self.client = self._initialize_client()
            
        if not self.client:
            return {"error": "Client not initialized - OAuth required"}
            
        try:
            ga_service = self.client.get_service("GoogleAdsService")
            
            query = """
                SELECT
                    customer.id,
                    customer.descriptive_name,
                    customer.currency_code,
                    customer.time_zone,
                    customer.manager
                FROM customer
                LIMIT 1
            """
            
            response = ga_service.search(customer_id=CUSTOMER_ID, query=query)
            
            for row in response:
                return {
                    "id": row.customer.id,
                    "name": row.customer.descriptive_name,
                    "currency": row.customer.currency_code,
                    "timezone": row.customer.time_zone,
                    "is_manager": row.customer.manager
                }
                
            return {"error": "No customer data found"}
            
        except GoogleAdsException as ex:
            logger.error(f"Google Ads API error: {ex}")
            return {"error": str(ex)}
        except Exception as e:
            logger.error(f"Error getting account info: {e}")
            return {"error": str(e)}
    
    def get_shopping_campaigns(self) -> List[dict]:
        """Retrieve all Shopping campaigns"""
        if not self.client:
            self.client = self._initialize_client()
            
        if not self.client:
            return []
            
        try:
            ga_service = self.client.get_service("GoogleAdsService")
            
            query = """
                SELECT
                    campaign.id,
                    campaign.name,
                    campaign.status,
                    campaign.shopping_setting.merchant_id,
                    campaign_budget.amount_micros,
                    metrics.impressions,
                    metrics.clicks,
                    metrics.cost_micros,
                    metrics.conversions
                FROM campaign
                WHERE campaign.advertising_channel_type = 'SHOPPING'
                ORDER BY campaign.name
            """
            
            response = ga_service.search_stream(customer_id=CUSTOMER_ID, query=query)
            
            campaigns = []
            for batch in response:
                for row in batch.results:
                    campaigns.append({
                        "id": str(row.campaign.id),
                        "name": row.campaign.name,
                        "status": row.campaign.status.name,
                        "merchant_id": row.campaign.shopping_setting.merchant_id,
                        "budget": row.campaign_budget.amount_micros / 1_000_000,
                        "impressions": row.metrics.impressions,
                        "clicks": row.metrics.clicks,
                        "cost": row.metrics.cost_micros / 1_000_000,
                        "conversions": row.metrics.conversions
                    })
            
            return campaigns
            
        except GoogleAdsException as ex:
            logger.error(f"Google Ads API error: {ex}")
            return []
        except Exception as e:
            logger.error(f"Error retrieving campaigns: {e}")
            return []
    
    def create_shopping_campaign(
        self,
        campaign_name: str,
        daily_budget: float,
        merchant_id: int = None
    ) -> dict:
        """Create a new Shopping campaign"""
        if not self.client:
            self.client = self._initialize_client()
            
        if not self.client:
            return {"error": "Client not initialized - OAuth required"}
            
        merchant_id = merchant_id or MERCHANT_CENTER_ID
        
        try:
            campaign_service = self.client.get_service("CampaignService")
            budget_service = self.client.get_service("CampaignBudgetService")
            
            # Create campaign budget
            budget_operation = self.client.get_type("CampaignBudgetOperation")
            budget = budget_operation.create
            budget.name = f"{campaign_name} Budget"
            budget.delivery_method = self.client.enums.BudgetDeliveryMethodEnum.STANDARD
            budget.amount_micros = int(daily_budget * 1_000_000)
            
            budget_response = budget_service.mutate_campaign_budgets(
                customer_id=CUSTOMER_ID,
                operations=[budget_operation]
            )
            budget_resource_name = budget_response.results[0].resource_name
            
            # Create Shopping campaign
            campaign_operation = self.client.get_type("CampaignOperation")
            campaign = campaign_operation.create
            campaign.name = campaign_name
            campaign.advertising_channel_type = self.client.enums.AdvertisingChannelTypeEnum.SHOPPING
            campaign.shopping_setting.merchant_id = merchant_id
            campaign.shopping_setting.campaign_priority = 0
            campaign.shopping_setting.enable_local = True
            campaign.status = self.client.enums.CampaignStatusEnum.PAUSED
            campaign.campaign_budget = budget_resource_name
            campaign.manual_cpc.enhanced_cpc_enabled = False
            
            campaign_response = campaign_service.mutate_campaigns(
                customer_id=CUSTOMER_ID,
                operations=[campaign_operation]
            )
            
            campaign_resource_name = campaign_response.results[0].resource_name
            logger.info(f"Shopping campaign created: {campaign_resource_name}")
            
            return {
                "success": True,
                "campaign_id": campaign_resource_name,
                "campaign_name": campaign_name,
                "budget": daily_budget,
                "merchant_id": merchant_id
            }
            
        except GoogleAdsException as ex:
            error_details = []
            for error in ex.failure.errors:
                error_details.append({
                    "code": str(error.error_code),
                    "message": error.message
                })
            logger.error(f"Google Ads API error: {error_details}")
            return {"error": "API error", "details": error_details}
        except Exception as e:
            logger.error(f"Error creating shopping campaign: {e}")
            return {"error": str(e)}


# Singleton instance
google_ads_service = GoogleAdsService()
