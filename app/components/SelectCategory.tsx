'use client';
import React, { useState } from 'react';
import { categoryItems } from '../lib/categoryItems';
import { Card, CardHeader } from '@/components/ui/card';

function SelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 md:grid-cols-3'>
      <input type='hidden' name='category' value={selectedCategory || ''} />
      {categoryItems.map((item) => (
        <div className='cursor-pointer' key={item.id}>
          <Card
            onClick={() => setSelectedCategory(item.name)}
            className={
              selectedCategory === item.name
                ? 'border-2 border-primary'
                : 'border-2 border-primary/10'
            }
          >
            <CardHeader>
              {item.image}
              <h3>{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default SelectCategory;
