import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipIdO = `${id}-monogram-clip-o`;
  const clipIdK = `${id}-monogram-clip-k`;

  return (
    <>
      <svg
        aria-hidden
        className={classes(styles.monogram, className)}
        width="48"
        height="29"
        viewBox="0 0 100 100"
        ref={ref}
        {...props}
      >
        <defs>
          {/* ClipPath for O */}
          <clipPath id={clipIdO}>
            <path
              d="M50,0h6 
             A40,40 0 1,1 50,90 
             A40,40 0 1,1 50,10 
             M50,20 
             A30,30 0 1,0 50,80 
             A30,30 0 1,0 50,20Z"
            />
          </clipPath>

          {/* ClipPath for K */}
          <clipPath id={clipIdK}>
            <path
              d="M20,10 
             L20,90 
             M20,50 
             L50,10 
             M20,50 
             L50,90"
            />
          </clipPath>
        </defs>

        {/* Render the O */}
        <rect clipPath={`url(#${clipIdO})`} width="100%" height="100%" />
        
        {/* Render the K */}
        <rect clipPath={`url(#${clipIdK})`} width="100%" height="100%" />
        
        {highlight && (
          <g clipPath={`url(#${clipIdO})`}>
            <rect className={styles.highlight} width="100%" height="100%" />
          </g>
        )}

        {highlight && (
          <g clipPath={`url(#${clipIdK})`}>
            <rect className={styles.highlight} width="100%" height="100%" />
          </g>
        )}
      </svg>
    </>
  );
});
