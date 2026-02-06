import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  ArrowLeft, 
  Save,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  Type,
  List,
  Star,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  Settings,
  Layers,
  FileText,
  Check,
  X,
  Upload,
  Link as LinkIcon
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminAdvancedProductEditor = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('images');
  
  // Editable product data
  const [editData, setEditData] = useState({
    images: [],
    sections: [],
    features: [],
    benefits: [],
    description: '',
    shortDescription: ''
  });

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          
          // Initialize edit data from product
          setEditData({
            images: data.gallery || [{ url: data.image, visible: true, order: 0 }],
            sections: data.customSections || getDefaultSections(data),
            features: (data.features || []).map((f, i) => ({ id: i, text: f, visible: true })),
            benefits: (data.benefits || []).map((b, i) => ({ id: i, text: b, visible: true })),
            description: data.description || '',
            shortDescription: data.shortDescription || ''
          });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
      setLoading(false);
    };
    
    fetchProduct();
  }, [productId]);

  // Get default sections based on product data
  const getDefaultSections = (prod) => {
    return [
      { id: 'header', type: 'header', title: 'Product Header', visible: true, order: 0 },
      { id: 'price', type: 'price', title: 'Prijs Sectie', visible: true, order: 1 },
      { id: 'description', type: 'description', title: 'Beschrijving', visible: true, order: 2 },
      { id: 'benefits', type: 'benefits', title: 'Voordelen', visible: true, order: 3 },
      { id: 'features', type: 'features', title: 'Eigenschappen', visible: true, order: 4 },
      { id: 'reviews', type: 'reviews', title: 'Reviews', visible: true, order: 5 },
      { id: 'faq', type: 'faq', title: 'Veelgestelde Vragen', visible: true, order: 6 }
    ];
  };

  // Save changes
  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/products/${productId}/advanced`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gallery: editData.images,
          customSections: editData.sections,
          features: editData.features.filter(f => f.visible).map(f => f.text),
          benefits: editData.benefits.filter(b => b.visible).map(b => b.text),
          description: editData.description,
          shortDescription: editData.shortDescription
        })
      });
      
      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error saving:', error);
    }
    setSaving(false);
  };

  // Image handlers
  const addImage = () => {
    setEditData(prev => ({
      ...prev,
      images: [...prev.images, { url: '', alt: '', visible: true, order: prev.images.length }]
    }));
  };

  const updateImage = (index, field, value) => {
    setEditData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const removeImage = (index) => {
    setEditData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const moveImage = (index, direction) => {
    const newImages = [...editData.images];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newImages.length) {
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      setEditData(prev => ({ ...prev, images: newImages }));
    }
  };

  // Section handlers
  const toggleSectionVisibility = (sectionId) => {
    setEditData(prev => ({
      ...prev,
      sections: prev.sections.map(s => 
        s.id === sectionId ? { ...s, visible: !s.visible } : s
      )
    }));
  };

  const moveSection = (index, direction) => {
    const newSections = [...editData.sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newSections.length) {
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      setEditData(prev => ({ ...prev, sections: newSections }));
    }
  };

  // Feature/Benefit handlers
  const addFeature = () => {
    setEditData(prev => ({
      ...prev,
      features: [...prev.features, { id: Date.now(), text: '', visible: true }]
    }));
  };

  const updateFeature = (id, text) => {
    setEditData(prev => ({
      ...prev,
      features: prev.features.map(f => f.id === id ? { ...f, text } : f)
    }));
  };

  const toggleFeatureVisibility = (id) => {
    setEditData(prev => ({
      ...prev,
      features: prev.features.map(f => f.id === id ? { ...f, visible: !f.visible } : f)
    }));
  };

  const removeFeature = (id) => {
    setEditData(prev => ({
      ...prev,
      features: prev.features.filter(f => f.id !== id)
    }));
  };

  const addBenefit = () => {
    setEditData(prev => ({
      ...prev,
      benefits: [...prev.benefits, { id: Date.now(), text: '', visible: true }]
    }));
  };

  const updateBenefit = (id, text) => {
    setEditData(prev => ({
      ...prev,
      benefits: prev.benefits.map(b => b.id === id ? { ...b, text } : b)
    }));
  };

  const toggleBenefitVisibility = (id) => {
    setEditData(prev => ({
      ...prev,
      benefits: prev.benefits.map(b => b.id === id ? { ...b, visible: !b.visible } : b)
    }));
  };

  const removeBenefit = (id) => {
    setEditData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(b => b.id !== id)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-[#8B7355]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Product niet gevonden</p>
          <Link to="/admin/products">
            <Button variant="outline">Terug naar Producten</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="advanced-product-editor">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/products" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Geavanceerde Editor</h1>
                <p className="text-sm text-gray-500">{product.shortName || product.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                to={`/product/${product.id}`} 
                target="_blank"
                className="text-sm text-[#8B7355] hover:underline flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Link>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#8B7355] hover:bg-[#6d5a45]"
                data-testid="save-btn"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : saveSuccess ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {saveSuccess ? 'Opgeslagen!' : 'Opslaan'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-4 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#8B7355]" />
                Editor Menu
              </h2>
              
              <nav className="space-y-1">
                {[
                  { id: 'images', label: 'Afbeeldingen', icon: ImageIcon },
                  { id: 'sections', label: 'Secties', icon: Layers },
                  { id: 'content', label: 'Tekst Content', icon: FileText },
                  { id: 'features', label: 'Eigenschappen', icon: List },
                  { id: 'benefits', label: 'Voordelen', icon: Star }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#8B7355] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    data-testid={`tab-${tab.id}`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>

              {/* Product Preview Card */}
              <div className="mt-6 p-4 bg-[#fdf8f3] rounded-xl">
                <img 
                  src={product.image} 
                  alt={product.shortName}
                  className="w-full h-32 object-contain rounded-lg mb-3"
                />
                <h3 className="font-semibold text-[#5a4a3a] text-sm">{product.shortName}</h3>
                <p className="text-[#8B7355] font-bold">€{product.price}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#8B7355]" />
                    Product Afbeeldingen
                  </h2>
                  <Button onClick={addImage} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Afbeelding Toevoegen
                  </Button>
                </div>

                <div className="space-y-4">
                  {editData.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-4 p-4 border rounded-xl ${
                        !image.visible ? 'bg-gray-50 opacity-60' : ''
                      }`}
                    >
                      {/* Drag Handle */}
                      <div className="text-gray-400 cursor-move">
                        <GripVertical className="w-5 h-5" />
                      </div>

                      {/* Image Preview */}
                      <div className="w-20 h-20 bg-[#fdf8f3] rounded-lg flex items-center justify-center overflow-hidden">
                        {image.url ? (
                          <img src={image.url} alt={`Image ${index + 1}`} className="w-full h-full object-contain" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-gray-300" />
                        )}
                      </div>

                      {/* URL Input */}
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">Afbeelding URL</label>
                        <Input
                          value={image.url}
                          onChange={(e) => updateImage(index, 'url', e.target.value)}
                          placeholder="/products/image.png of https://..."
                          className="text-sm"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveImage(index, 'up')}
                          disabled={index === 0}
                          className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveImage(index, 'down')}
                          disabled={index === editData.images.length - 1}
                          className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateImage(index, 'visible', !image.visible)}
                          className={`p-2 rounded-lg transition-colors ${
                            image.visible ? 'text-green-600 hover:bg-green-50' : 'text-orange-500 hover:bg-orange-50'
                          }`}
                        >
                          {image.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => removeImage(index)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {editData.images.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>Nog geen afbeeldingen</p>
                      <Button onClick={addImage} variant="outline" className="mt-4">
                        <Plus className="w-4 h-4 mr-1" />
                        Eerste Afbeelding Toevoegen
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sections Tab */}
            {activeTab === 'sections' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#8B7355]" />
                  Pagina Secties
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Beheer de volgorde en zichtbaarheid van secties op de productpagina.
                </p>

                <div className="space-y-3">
                  {editData.sections.map((section, index) => (
                    <div 
                      key={section.id}
                      className={`flex items-center gap-4 p-4 border rounded-xl transition-colors ${
                        !section.visible ? 'bg-gray-50 opacity-60' : 'hover:border-[#8B7355]'
                      }`}
                    >
                      <div className="text-gray-400 cursor-move">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{section.title}</h3>
                        <p className="text-xs text-gray-500">Type: {section.type}</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveSection(index, 'up')}
                          disabled={index === 0}
                          className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveSection(index, 'down')}
                          disabled={index === editData.sections.length - 1}
                          className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleSectionVisibility(section.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            section.visible ? 'text-green-600 hover:bg-green-50' : 'text-orange-500 hover:bg-orange-50'
                          }`}
                        >
                          {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#8B7355]" />
                    Tekst Content
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Korte Beschrijving
                      </label>
                      <textarea
                        value={editData.shortDescription}
                        onChange={(e) => setEditData(prev => ({ ...prev, shortDescription: e.target.value }))}
                        rows={2}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] resize-none"
                        placeholder="Korte beschrijving voor in de productkaart..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Volledige Beschrijving
                      </label>
                      <textarea
                        value={editData.description}
                        onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                        rows={6}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] resize-none"
                        placeholder="Uitgebreide productbeschrijving..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <List className="w-5 h-5 text-[#8B7355]" />
                    Eigenschappen
                  </h2>
                  <Button onClick={addFeature} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Eigenschap Toevoegen
                  </Button>
                </div>

                <div className="space-y-3">
                  {editData.features.map((feature) => (
                    <div 
                      key={feature.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg ${
                        !feature.visible ? 'bg-gray-50 opacity-60' : ''
                      }`}
                    >
                      <Input
                        value={feature.text}
                        onChange={(e) => updateFeature(feature.id, e.target.value)}
                        placeholder="Bijv. 60 verschillende melodieën"
                        className="flex-1"
                      />
                      <button
                        onClick={() => toggleFeatureVisibility(feature.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          feature.visible ? 'text-green-600 hover:bg-green-50' : 'text-orange-500 hover:bg-orange-50'
                        }`}
                      >
                        {feature.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => removeFeature(feature.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {editData.features.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <List className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                      <p>Nog geen eigenschappen</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Benefits Tab */}
            {activeTab === 'benefits' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#8B7355]" />
                    Voordelen
                  </h2>
                  <Button onClick={addBenefit} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Voordeel Toevoegen
                  </Button>
                </div>

                <div className="space-y-3">
                  {editData.benefits.map((benefit) => (
                    <div 
                      key={benefit.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg ${
                        !benefit.visible ? 'bg-gray-50 opacity-60' : ''
                      }`}
                    >
                      <Input
                        value={benefit.text}
                        onChange={(e) => updateBenefit(benefit.id, e.target.value)}
                        placeholder="Bijv. 🌟 Helpt bij beter slapen"
                        className="flex-1"
                      />
                      <button
                        onClick={() => toggleBenefitVisibility(benefit.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          benefit.visible ? 'text-green-600 hover:bg-green-50' : 'text-orange-500 hover:bg-orange-50'
                        }`}
                      >
                        {benefit.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => removeBenefit(benefit.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {editData.benefits.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Star className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                      <p>Nog geen voordelen</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAdvancedProductEditor;
