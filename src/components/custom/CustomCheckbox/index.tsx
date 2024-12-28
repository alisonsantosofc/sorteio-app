import React, { ReactNode } from 'react';

import { Checkbox } from '@/src/components/ui/checkbox';
import { Label } from '@/src/components/ui/label';

import { cn } from '@/src/lib/utils';

interface CustomCheckboxProps {
  checked: boolean;
  labelText?: string;
  checkedLabelText?: string;
	labelTextClassName?: string;
  onClick?: () => void;
	className?: string;
	disabled?: boolean;
	labelComponent?: ReactNode;
}

function CustomCheckbox({ checked, labelText, checkedLabelText, labelTextClassName, disabled, onClick, className, labelComponent }: CustomCheckboxProps) {
	return (
		<div className={cn('w-fit flex place-items-start gap-2', className ? className : '')}>
			<Checkbox disabled={disabled} id="checkbox" className='[&[data-state=checked]]:bg-blue-800 [&[data-state=checked]]:border-blue-800 [&[data-state=checked]]:text-white' checked={checked} onClick={() => onClick && onClick() } />
			{labelText && <Label htmlFor="checkbox" className={cn('leading-5 font-normal text-xs', labelTextClassName ? labelTextClassName : '')}>{(checkedLabelText && checked) ? checkedLabelText : labelText}</Label>}
			{labelComponent && !labelText ? labelComponent : null}
		</div>
	);
}

export default CustomCheckbox;