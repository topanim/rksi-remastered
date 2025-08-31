import React, { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface AdvancedTableProps {
  headers?: string[];
  data: string[][];
  title?: string;
}

type SortDirection = 'asc' | 'desc' | null;

export function AdvancedTable({ headers, data, title }: AdvancedTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Фильтрация данных по поиску
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    
    return data.filter(row => 
      row.some(cell => {
        // Создаем временный элемент для извлечения текста из HTML
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = cell
        const textContent = tempDiv.textContent || tempDiv.innerText || ''
        return textContent.toLowerCase().includes(searchTerm.toLowerCase())
      })
    );
  }, [data, searchTerm]);

  // Сортировка данных
  const sortedData = useMemo(() => {
    if (sortColumn === null) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aCell = a[sortColumn] || '';
      const bCell = b[sortColumn] || '';
      
      // Извлекаем текст из HTML для сортировки
      const tempDivA = document.createElement('div')
      tempDivA.innerHTML = aCell
      const aValue = tempDivA.textContent || tempDivA.innerText || ''
      
      const tempDivB = document.createElement('div')
      tempDivB.innerHTML = bCell
      const bValue = tempDivB.textContent || tempDivB.innerText || ''
      
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue, 'ru');
      } else {
        return bValue.localeCompare(aValue, 'ru');
      }
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Пагинация
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  // Обработчики сортировки
  const handleSort = (columnIndex: number) => {
    if (sortColumn === columnIndex) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortColumn(null);
      }
    } else {
      setSortColumn(columnIndex);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Сбрасываем на первую страницу при сортировке
  };

  // Обработчик поиска
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Сбрасываем на первую страницу при поиске
  };

  // Обработчик изменения страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Генерация номеров страниц для отображения
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="mb-8">
      <div className="rounded-lg border bg-card">
        {/* Заголовок и поиск */}
        <div className="p-4 border-b bg-muted/30">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              {title && (
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              )}
              <Badge variant="secondary">
                {filteredData.length} записей
              </Badge>
            </div>
            
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по таблице..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Таблица */}
        <div className="overflow-x-auto">
          <Table>
            {headers && (
              <TableHeader>
                <TableRow className="border-b bg-muted/50">
                  {headers.map((header, headerIndex) => (
                    <TableHead 
                      key={headerIndex} 
                      className="font-semibold text-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                      onClick={() => handleSort(headerIndex)}
                    >
                      <div className="flex items-center gap-2">
                        {header}
                        {sortColumn === headerIndex && (
                          <div className="flex flex-col">
                            <ChevronUp 
                              className={`h-3 w-3 ${
                                sortDirection === 'asc' ? 'text-primary' : 'text-muted-foreground'
                              }`} 
                            />
                            <ChevronDown 
                              className={`h-3 w-3 -mt-1 ${
                                sortDirection === 'desc' ? 'text-primary' : 'text-muted-foreground'
                              }`} 
                            />
                          </div>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {currentData.map((row, rowIndex) => (
                <TableRow 
                  key={rowIndex} 
                  className={rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/30'}
                >
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="text-foreground">
                      <div dangerouslySetInnerHTML={{ __html: cell }} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="p-4 border-t bg-muted/30">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Показано {startIndex + 1}-{Math.min(endIndex, sortedData.length)} из {sortedData.length} записей
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Назад
                </Button>
                
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === '...' ? (
                        <span className="px-2 text-muted-foreground">...</span>
                      ) : (
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page as number)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Вперед
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
