import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Badge } from "@/components/ui/badge";
import { RksiApi, type StructuredSectionDetail } from "@/api/RksiApi";
import { StructuredContent } from "@/components/app/StructuredContent";



export default function SectionDetail() {
  const { section } = useParams<{ section: string }>();
  const [sectionData, setSectionData] = useState<StructuredSectionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!section) return;

    const fetchSectionContent = async () => {
      setLoading(true);
      setError(null);

      try {
        // Используем API для загрузки содержимого подраздела
        const sectionData = await RksiApi.getSectionDetail(section);
        setSectionData(sectionData);
      } catch (err) {
        console.error('Ошибка при загрузке страницы:', err);
        setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке страницы');
      } finally {
        setLoading(false);
      }
    };

    fetchSectionContent();
  }, [section]);



  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Загрузка содержимого...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-background rounded-lg border border-destructive p-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <ExternalLink className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-destructive mb-2">
                  Ошибка загрузки
                </h2>
                <p className="text-muted-foreground mb-4">{error}</p>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link to="/">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      На главную
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Попробовать снова
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sectionData) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок и навигация */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-6 -ml-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Link>
          </Button>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground leading-tight">{sectionData.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-sm">
                  Последнее обновление: {formatDate(sectionData.lastUpdated)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Источник: официальный сайт РКСИ
                </span>
              </div>
              
              <Button variant="outline" asChild>
                <a 
                  href={sectionData.originalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Открыть оригинал
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Баннер */}
        {sectionData.banner && (
          <div className="mb-8">
            <div className="bg-background rounded-lg border overflow-hidden">
              <img
                src={sectionData.banner.src}
                alt={sectionData.banner.alt || 'Баннер страницы'}
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          </div>
        )}

        <Separator className="mb-6" />

        {/* Основной контент */}
        <div className="bg-background rounded-lg">
          {sectionData.content && sectionData.content.length > 0 ? (
            <StructuredContent content={sectionData.content} />
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <p>Содержимое не найдено</p>
            </div>
          )}
        </div>

        {/* Информация о кэшировании */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Содержимое загружено с официального сайта РКСИ и кэшировано для быстрого доступа
          </p>
        </div>
      </div>
    </div>
  );
}
