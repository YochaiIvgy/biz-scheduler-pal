import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Upload, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";

const MediaManagementCard = () => {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', name: 'laptop.jpg' },
    { id: 2, url: 'https://images.unsplash.com/photo-1518770660439-4636190af475', name: 'tech.jpg' },
  ]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleUpload = () => {
    // Simulated upload - in a real app, this would call an API
    toast({
      title: "העלאה הושלמה",
      description: `${selectedFiles.length} קבצים הועלו בהצלחה`,
    });
    setSelectedFiles([]);
  };

  const handleDelete = (id: number) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
    toast({
      title: "קובץ נמחק",
      description: "הקובץ נמחק בהצלחה",
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50">
        <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
          <Image className="h-5 w-5" />
          ניהול מדיה
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="upload">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                העלאת קבצים
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    accept="image/*"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <Plus className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-500">לחץ או גרור קבצים לכאן</span>
                  </label>
                </div>
                
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">קבצים נבחרו:</div>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="text-sm text-gray-500">
                        {file.name}
                      </div>
                    ))}
                    <Button onClick={handleUpload} className="w-full mt-2">
                      העלה {selectedFiles.length} קבצים
                    </Button>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="manage">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                תמונות קיימות
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                {uploadedImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(image.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default MediaManagementCard;