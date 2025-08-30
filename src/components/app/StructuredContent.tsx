import React from "react";
import type { ContentElement } from "@/api/RksiApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

interface StructuredContentProps {
  content: ContentElement[];
}

export function StructuredContent({ content }: StructuredContentProps) {
  const renderElement = (element: ContentElement, index: number) => {
    switch (element.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {element.content}
          </p>
        );
        
      case 'heading':
        const headingClasses = {
          1: "text-4xl font-bold text-gray-900 mb-6",
          2: "text-3xl font-bold text-gray-900 mb-5",
          3: "text-2xl font-semibold text-gray-800 mb-4",
          4: "text-xl font-semibold text-gray-800 mb-3",
          5: "text-lg font-medium text-gray-700 mb-2",
          6: "text-base font-medium text-gray-700 mb-2"
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
          <strong key={index} className="font-semibold text-gray-900">
            {element.content}
          </strong>
        );
        
      case 'table':
        return (
          <div key={index} className="mb-6 overflow-x-auto">
            <Table>
              {element.headers && (
                <TableHeader>
                  <TableRow>
                    {element.headers.map((header, headerIndex) => (
                      <TableHead key={headerIndex} className="font-semibold">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
              )}
              <TableBody>
                {element.data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
        
      case 'list':
        const ListTag = element.ordered ? 'ol' : 'ul';
        const listClasses = element.ordered 
          ? "list-decimal list-inside mb-4 space-y-1"
          : "list-disc list-inside mb-4 space-y-1";
          
        return (
          <ListTag key={index} className={listClasses}>
            {element.items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-700">
                {item}
              </li>
            ))}
          </ListTag>
        );
        
      case 'image':
        return (
          <div key={index} className="mb-6 text-center">
            <img
              src={element.src}
              alt={element.alt || element.title || ''}
              title={element.title}
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
            />
            {(element.alt || element.title) && (
              <p className="mt-2 text-sm text-gray-600 italic">
                {element.alt || element.title}
              </p>
            )}
          </div>
        );
        
      case 'link':
        return (
          <a
            key={index}
            href={element.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
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
