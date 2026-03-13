import React from 'react';
import classNames from 'classnames';
import { Box, as } from 'folds';
import * as css from './UrlPreview.css';
import { useSetting } from '../../state/hooks/settings';
import { settingsAtom } from '../../state/settings';

export const UrlPreview = as<'div'>(({ className, ...props }, ref) => (
  <Box shrink="No" className={classNames(css.UrlPreview, className)} {...props} ref={ref} />
));

export const UrlPreviewImg = as<'img', { className: string; alt: string, bigUrlPreview: boolean } > (
		({className, alt, bigUrlPreview, ...props}, ref ) => {
  const [coverUrlPreview] = useSetting(settingsAtom, 'coverUrlPreview');
  const objectFit = coverUrlPreview ? 'cover' : 'contain';
	const bigUrlPreviewProps: Partial<React.ComponentProps<typeof Box>> | undefined = bigUrlPreview 
		? {
		style: {
    width: '100%',
    height: '100%',
		maxHeight: '300px',
    objectFit,
    objectPosition: 'center',
    justifyContent: 'center',
	}} : undefined; 

  return <img {...bigUrlPreviewProps} className={classNames(css.UrlPreviewImg, className)} alt={alt} {...props} ref={ref} />
});

export const UrlPreviewContent = as<'div'>(({ className, ...props }, ref) => (
  <Box
    grow="Yes"
    direction="Column"
    gap="100"
    className={classNames(css.UrlPreviewContent, className)}
    {...props}
    ref={ref}
  />
));

export const UrlPreviewDescription = as<'span'>(({ className, ...props }, ref) => (
  <span className={classNames(css.UrlPreviewDescription, className)} {...props} ref={ref} />
));
