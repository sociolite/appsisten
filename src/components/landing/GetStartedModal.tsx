import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ga4Event, ga4TrackFormSubmit } from '@/lib/ga4';
import { useLanguage } from '@/i18n/LanguageContext';

interface GetStartedModalProps {
  trigger: ReactNode;
  location: string;
}

export const GetStartedModal = ({ trigger, location }: GetStartedModalProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const labels = useMemo(() => {
    return {
      title: t('getStartedModal.title'),
      subtitle: t('getStartedModal.subtitle'),
      emailLabel: t('getStartedModal.emailLabel'),
      emailPlaceholder: t('getStartedModal.emailPlaceholder'),
      submit: t('getStartedModal.submit'),
      privacy: t('getStartedModal.privacy'),
      successTitle: t('getStartedModal.successTitle'),
      successBody: t('getStartedModal.successBody'),
      error: t('getStartedModal.error'),
    };
  }, [t]);

  useEffect(() => {
    if (open) {
      ga4Event('CTA', 'Get Started Open', location);
    }
  }, [open, location]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    const payload = {
      email: email.trim().toLowerCase(),
      source: 'landing',
      notes: location,
    };

    fetch(`${apiBase}/api/public/get-started`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('request_failed');
        }
        return response.json();
      })
      .then(() => {
        ga4TrackFormSubmit('Get Started', location);
        ga4Event('Lead', 'Get Started Submit', location);
        setIsSubmitted(true);
      })
      .catch(() => {
        setErrorMessage(labels.error);
        ga4Event('Lead', 'Get Started Error', location);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setEmail('');
      setIsSubmitted(false);
      setIsSubmitting(false);
      setErrorMessage('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">{labels.title}</DialogTitle>
          <DialogDescription className="text-base">{labels.subtitle}</DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="rounded-2xl border border-border/50 bg-muted/40 p-6 text-center">
            <p className="text-lg font-semibold text-foreground">{labels.successTitle}</p>
            <p className="mt-2 text-sm text-muted-foreground">{labels.successBody}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="get-started-email">
                {labels.emailLabel}
              </label>
              <Input
                id="get-started-email"
                type="email"
                autoComplete="email"
                placeholder={labels.emailPlaceholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>
            {errorMessage ? (
              <p className="text-sm text-red-500">{errorMessage}</p>
            ) : null}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('getStartedModal.submitting') : labels.submit}
            </Button>
            <p className="text-xs text-muted-foreground text-center">{labels.privacy}</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
