import React from 'react';
import { Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MediaManagementCard = () => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Here you would typically handle the file upload
      console.log('Files selected:', files);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">ניהול מדיה</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="images">
            <AccordionTrigger className="text-right">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span>תמונות העסק</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  {/* Sample images grid - replace with actual images */}
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="media-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-6 w-6 mb-2" />
                      <p className="mb-2 text-sm">
                        <span className="font-semibold">לחץ להעלאת קבצים</span> או גרור לכאן
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG או JPEG (מקס. 10MB)
                      </p>
                    </div>
                    <input
                      id="media-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="documents">
            <AccordionTrigger className="text-right">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>מסמכים</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500">
                    העלה מסמכים חשובים כמו רישיונות, תעודות, או מסמכי מדיניות
                  </p>
                  
                  <label
                    htmlFor="document-upload"
                    className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="h-6 w-6 mb-2" />
                      <p className="text-sm">העלה מסמכים</p>
                    </div>
                    <input
                      id="document-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      multiple
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default MediaManagementCard;