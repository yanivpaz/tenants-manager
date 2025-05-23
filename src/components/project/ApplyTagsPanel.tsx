"use client";

import { useState } from 'react';
import { Save, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function ApplyTagsPanel() {
  const [autoApply, setAutoApply] = useState(true);

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Save className="w-5 h-5 text-green-600" />
          Apply tags to transcripts
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Transcripts</h3>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</div>
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-2.5"
        >
          <Save className="w-4 h-4 mr-2" />
          Save & Apply Tags
        </Button>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch
                id="auto-apply"
                checked={autoApply}
                onCheckedChange={setAutoApply}
              />
              <Label 
                htmlFor="auto-apply" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Automatically apply to new transcripts
              </Label>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium mb-1">For each tag, AI will automatically identify and highlight matching excerpts from all interview transcripts.</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  For each tag, AI will automatically identify and highlight matching excerpts from all interview transcripts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 