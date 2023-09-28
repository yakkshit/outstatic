import React from 'react';
import { Editor } from 'novel';
import { ThemeProvider } from '@/components/theme-provider';

export default function Post() {
  return (
    <div>
      <ThemeProvider>
        <Editor />
        {/* Additional content for your post page */}
      </ThemeProvider>
    </div>
  );
}
