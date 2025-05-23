"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Tag } from './TagManager';

interface AddTagModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (tag: Tag) => void;
  existingCategories: Array<{ name: string; color: string }>;
}

const predefinedColors = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16'  // Lime
];

const defaultCategories = [
  { name: 'Motivations & goals', color: '#3B82F6' },
  { name: 'Barriers & pain points', color: '#EF4444' },
  { name: 'Behaviours & patterns', color: '#F59E0B' },
  { name: 'Attitudes & perceptions', color: '#F59E0B' },
  { name: 'Workspace setup', color: '#10B981' },
  { name: 'Communication tools', color: '#8B5CF6' },
  { name: 'Work-life boundaries', color: '#06B6D4' },
  { name: 'Remote work challenges', color: '#EF4444' },
  { name: 'Team dynamics', color: '#84CC16' }
];

export function AddTagModal({ open, onClose, onAdd, existingCategories }: AddTagModalProps) {
  const [tagName, setTagName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState(predefinedColors[0]);

  const allCategories = [...new Map([...defaultCategories, ...existingCategories].map(cat => [cat.name, cat])).values()];

  const handleSubmit = () => {
    if (!tagName.trim()) return;

    let category;
    if (isCreatingNew && newCategoryName.trim()) {
      category = {
        name: newCategoryName.trim(),
        color: selectedColor
      };
    } else if (selectedCategory) {
      const existingCat = allCategories.find(cat => cat.name === selectedCategory);
      category = existingCat || { name: selectedCategory, color: predefinedColors[0] };
    } else {
      return; // No category selected
    }

    const newTag: Tag = {
      _id: Date.now().toString(),
      name: tagName.trim(),
      category,
      count: 0,
      status: 'Pending',
      aiGenerated: false
    };

    onAdd(newTag);
    handleClose();
  };

  const handleClose = () => {
    setTagName('');
    setSelectedCategory('');
    setIsCreatingNew(false);
    setNewCategoryName('');
    setSelectedColor(predefinedColors[0]);
    onClose();
  };

  const handleCategoryChange = (value: string) => {
    if (value === 'create-new') {
      setIsCreatingNew(true);
      setSelectedCategory('');
    } else {
      setIsCreatingNew(false);
      setSelectedCategory(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Add New Tag
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Tag Name */}
          <div>
            <Label htmlFor="tag-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tag Name
            </Label>
            <Input
              id="tag-name"
              placeholder="Enter tag name"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              className="mt-1"
              autoFocus
            />
          </div>

          {/* Category Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </Label>
              {!isCreatingNew && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setIsCreatingNew(true)}
                  className="text-xs p-0 h-auto"
                >
                  Create new
                </Button>
              )}
            </div>

            {isCreatingNew ? (
              <div className="space-y-3">
                <Input
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                
                {/* Color Picker */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Category Color
                  </Label>
                  <div className="flex gap-2 flex-wrap">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color 
                            ? 'border-gray-400 scale-110' 
                            : 'border-gray-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsCreatingNew(false);
                    setNewCategoryName('');
                  }}
                  className="w-full"
                >
                  Choose existing category
                </Button>
              </div>
            ) : (
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="create-new" className="text-blue-600 font-medium">
                    + Create new category
                  </SelectItem>
                  {allCategories.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!tagName.trim() || (!selectedCategory && !newCategoryName.trim())}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Add Tag
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 