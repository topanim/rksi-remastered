import type { ContentElement } from "@/api/RksiApi";
import { AdvancedTable } from "./AdvancedTable";
import { NewsCard } from "./NewsCard";

interface StructuredContentProps {
  content: ContentElement[];
}

export function StructuredContent({ content }: StructuredContentProps) {
  const renderElement = (element: ContentElement, index: number) => {
    switch (element.type) {
      case 'html':
        return (
          <div
            key={index}
            className="mb-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: element.content }}
          />
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
        
      case 'news':
        return (
          <div key={index} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {element.items.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {content.map((element, index) => {
        try {
          return renderElement(element, index);
        } catch (error) {
          console.error('Error rendering element:', error, element);
          return (
            <div key={index} className="p-4 border border-destructive rounded-lg bg-destructive/10">
              <p className="text-destructive text-sm">Ошибка отображения элемента</p>
            </div>
          );
        }
      })}
    </div>
  );
}
