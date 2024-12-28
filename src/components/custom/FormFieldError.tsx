import React from 'react';
import { AlertCircle } from 'lucide-react';
import { FieldError } from 'react-hook-form';

import { Label } from '../ui/label';
import { cn } from '@/src/lib/utils';

interface FormFieldErrorProps {
  error: FieldError | undefined;
}

export function FormFieldError({ error }: FormFieldErrorProps) {
	return (
		<div className={cn('flex items-center gap-1', error ? '' : 'hidden')}>
			<AlertCircle className="w-4 h-4 text-red-800 dark:text-red-400" />
			<Label className="text-xs text-red-800 dark:text-red-400 mt-[2px]">{error ? error.message : ''}</Label>
		</div>
	);
}
