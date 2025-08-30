import React from "react";
import type { ContentElement } from "@/api/RksiApi";
import { Separator } from "@/components/ui/separator";
import { AdvancedTable } from "./AdvancedTable";

interface StructuredContentProps {
  content: ContentElement[];
}

export function StructuredContent({ content }: StructuredContentProps) {
  const renderElement = (element: ContentElement, index: number) => {
    switch (element.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4 text-foreground leading-relaxed">
            {element.content}
          </p>
        );
        
      case 'heading':
        const headingClasses = {
          1: "text-4xl font-bold text-foreground mb-6",
          2: "text-3xl font-bold text-foreground mb-5",
          3: "text-2xl font-semibold text-foreground mb-4",
          4: "text-xl font-semibold text-foreground mb-3",
          5: "text-lg font-medium text-foreground mb-2",
          6: "text-base font-medium text-foreground mb-2"
        };
        
        switch (element.level) {
          case 1:
            return <h1 key={index} className={headingClasses[1]}>{element.content}</h1>;
          case 2:
            return <h2 key={index} className={headingClasses[2]}>{element.content}</h2>;
          case 3:
            return <h3 key={index} className={headingClasses[3]}>{element.content}</h3>;
          case 4:
            return <h4 key={index} className={headingClasses[4]}>{element.content}</h4>;
          case 5:
            return <h5 key={index} className={headingClasses[5]}>{element.content}</h5>;
          case 6:
            return <h6 key={index} className={headingClasses[6]}>{element.content}</h6>;
          default:
            return <h2 key={index} className={headingClasses[2]}>{element.content}</h2>;
        }
        
      case 'bold':
        return (
          <strong key={index} className="font-semibold text-foreground">
            {element.content}
          </strong>
        );
        
      case 'table':
        return (
          <AdvancedTable
            key={index}
            headers={element.headers}
            data={element.data}
            title="Таблица данных"
          />
        );
        
      case 'list':
        const ListTag = element.ordered ? 'ol' : 'ul';
        const listClasses = element.ordered 
          ? "list-decimal list-inside mb-4 space-y-1"
          : "list-disc list-inside mb-4 space-y-1";
          
        return (
          <ListTag key={index} className={listClasses}>
            {element.items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-foreground">
                {item}
              </li>
            ))}
          </ListTag>
        );
        
      case 'image':
        return (
          <div key={index} className="mb-8">
            <div className="bg-card rounded-lg border overflow-hidden shadow-sm">
              <img
                src={element.src}
                alt={element.alt || element.title || ''}
                title={element.title}
                className="w-full h-auto max-h-96 object-contain bg-background"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = '<div class="p-8 text-center text-muted-foreground">Изображение не загружено</div>'
                  }
                }}
              />
              {(element.alt || element.title) && (
                <div className="p-3 bg-muted/30 border-t">
                  <p className="text-sm text-muted-foreground text-center">
                    {element.alt || element.title}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'link':
        return (
          <a
            key={index}
            href={element.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline"
          >
            {element.text}
          </a>
        );
        
      case 'divider':
        return <Separator key={index} className="my-6" />;
        
      case 'raw':
        return (
          <div
            key={index}
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: element.html }}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {content.map((element, index) => renderElement(element, index))}
    </div>
  );
}
