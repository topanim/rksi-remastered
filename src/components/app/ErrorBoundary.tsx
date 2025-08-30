import React from "react";
import { useRouteError, Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ErrorBoundary() {
  const error = useRouteError() as any;
  
  let title = "Произошла ошибка";
  let message = "Что-то пошло не так";
  let status = 500;

  if (error?.status === 404) {
    title = "Страница не найдена";
    message = "Запрашиваемая страница не существует";
    status = 404;
  } else if (error?.status) {
    status = error.status;
    if (error.status === 403) {
      title = "Доступ запрещен";
      message = "У вас нет прав для просмотра этой страницы";
    } else if (error.status === 500) {
      title = "Внутренняя ошибка сервера";
      message = "Произошла техническая ошибка. Попробуйте позже.";
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-destructive mb-2">
                  {title}
                </h2>
                <p className="text-muted-foreground mb-4">{message}</p>
                {status && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Код ошибки: {status}
                  </p>
                )}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
