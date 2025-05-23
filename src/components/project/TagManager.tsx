"use client";

import { useState, useEffect } from 'react';
import { Sparkles, Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GenerateTagsModal } from './GenerateTagsModal';
import { AddTagModal } from './AddTagModal';
import { TagCard } from './TagCard';
import { TagDetails } from './TagDetails';
import { ApplyTagsPanel } from './ApplyTagsPanel';

export interface Tag {
  _id: string;
  name: string;
  category: {
    name: string;
    color: string;
  };
  count: number;
  status: 'Applied' | 'Pending';
  aiGenerated: boolean;
  description?: string;
  explanation?: string;
  excerpts?: Array<{
    text: string;
    transcriptId: string;
    transcriptTitle: string;
  }>;
}

export interface TagCategory {
  name: string;
  color: string;
  tags: Tag[];
}

interface TagManagerProps {
  projectId: string;
}

export function TagManager({ projectId }: TagManagerProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Mock data loading
    const loadTags = () => {
      // Simulate loading
      setTimeout(() => {
        setTags([]); // Start with no tags
        setLoading(false);
      }, 1000);
    };

    loadTags();
  }, [projectId]);

  const handleGenerateTags = (generatedTags: Tag[]) => {
    setTags(generatedTags);
    setShowGenerateModal(false);
  };

  const handleAddTag = (newTag: Tag) => {
    setTags(prev => [...prev, newTag]);
    setShowAddModal(false);
  };

  const handleSkipToManual = () => {
    // Redirect to manual tag creation
    setTags([]);
  };

  const groupedTags = tags.reduce((acc, tag) => {
    const categoryName = tag.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = {
        name: categoryName,
        color: tag.category.color,
        tags: []
      };
    }
    acc[categoryName].tags.push(tag);
    return acc;
  }, {} as Record<string, TagCategory>);

  const filteredTags = Object.values(groupedTags).map(category => ({
    ...category,
    tags: category.tags.filter(tag => 
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.tags.length > 0);

  if (loading) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50 p-10 shadow-xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  // No tags state - show initial options
  if (tags.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50 p-10 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tag manager
          </h2>
        </div>

        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <Filter className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            No Tags Found
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            This project doesn&apos;t have any tags yet. Generate tags to help organize and analyze your research data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowGenerateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Tags with AI
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleSkipToManual}
              className="px-6 py-3 rounded-lg font-medium border-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Skip and create manually
            </Button>
          </div>
        </div>

        <GenerateTagsModal
          open={showGenerateModal}
          onClose={() => setShowGenerateModal(false)}
          onGenerate={handleGenerateTags}
        />
      </div>
    );
  }

  // Main tag management interface
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tag manager
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add tag
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search tags"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex gap-6">
        {/* Tags Grid */}
        <div className="flex-1 space-y-8">
          {filteredTags.map((category) => (
            <div key={category.name} className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  style={{ backgroundColor: category.color + '20', color: category.color }}
                  className="px-3 py-1 text-sm font-medium"
                >
                  {category.name}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tags.map((tag) => (
                  <TagCard
                    key={tag._id}
                    tag={tag}
                    onClick={() => setSelectedTag(tag)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-6">
          <ApplyTagsPanel />
          
          {selectedTag && (
            <TagDetails
              tag={selectedTag}
              onClose={() => setSelectedTag(null)}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <AddTagModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddTag}
        existingCategories={Object.values(groupedTags).map(cat => ({
          name: cat.name,
          color: cat.color
        }))}
      />
    </div>
  );
} 