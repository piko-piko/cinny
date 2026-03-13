import React from 'react';
import classNames from 'classnames';
import { Box, as } from 'folds';
import * as css from './UrlPreview.css';

import { useMatrixClient } from '../../hooks/useMatrixClient';
import { mxcUrlToHttp } from '../../utils/matrix';
import { useSetting } from '../../state/hooks/settings';
import { settingsAtom } from '../../state/settings';

export const UrlPreview = as<'div'>(({ className, ...props }, ref) => (
  <Box shrink="No" className={classNames(css.UrlPreview, className)} {...props} ref={ref} />
));

export const UrlPreviewImg = as<'img', { 
  mxcUrl:string; className: string; alt: string; bigUrlPreview: boolean }>(({ className, alt, mxcUrl, bigUrlPreview, ...props }, ref) => {
  const mx = useMatrixClient();
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

  const handleAuxClick = (ev: React.MouseEvent) => {
    if (ev.button === 1) {
      ev.preventDefault();
      openMediaInNewTab();
    }
  };
  const openMediaInNewTab = async () => {
    try {
      const useAuthentication = true;
      const httpUrl = mxcUrlToHttp(mx, mxcUrl, useAuthentication);
      if (httpUrl) {
        const res = await fetch(httpUrl, {
           headers: {
             Authorization: `Bearer ${mx.getAccessToken()}`,
             },
         });
         if (!res.ok) {
           console.error("Failed to fetch media", res.status);
           return;
         }
         const blob = await res.blob();
         const blobUrl = URL.createObjectURL(blob);
         window.open(blobUrl, "_blank");
      }
      else (console.error("Error parsing mxc:// url", mxcUrl));
    } catch (err) {
      console.error("Error opening media", err);
    }
  };
  return (<img {...bigUrlPreviewProps}className={classNames(css.UrlPreviewImg, className)} alt={alt} {...props} ref={ref}  onAuxClick={handleAuxClick}/>
)
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
