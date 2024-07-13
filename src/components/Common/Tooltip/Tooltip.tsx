import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import './Tooltip.scss';
import { useTooltipInPortal } from '@visx/tooltip';
import { useWindowWidth } from '@/hooks/useWidth';
import ShowAt from '../ShowAt/ShowAt';

export type IPlacment = 'top' | 'left' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface TooltipProps {
  children?: React.ReactNode;
  text?: string | number | boolean;
  id?: string;
  show?: boolean;
  disabled?: boolean;
  width?: number | string;
  mobileWidth?: number | string;
  tabletWidth?: number | string;
  className?: string;
  tooltipClassName?: string;
  tooltipStyle?: React.CSSProperties;
  textClassName?: string;
  maxWidth?: string;
  placment?: IPlacment;
  mobilePlacement?: IPlacment;
  tabletPlacement?: IPlacment;
}

export default function Tooltip({
  children,
  text,
  show = true,
  disabled,
  tooltipStyle,
  className: passedClassName,
  tooltipClassName,
  textClassName,
  placment: initialPlacment = 'top',
  mobilePlacement,
  tabletPlacement,
  id,
  width = 180,
  mobileWidth = width,
  tabletWidth = width,
  maxWidth,
}: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const tooltipContentRef = useRef<HTMLDivElement | null>(null);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 650;
  const isTablet = windowWidth < 834;

  const [currentPlacement, setCurrentPlacement] = useState<IPlacment>(initialPlacment);

  const { containerRef, containerBounds } = useTooltipInPortal({
    scroll: true,
  });

  const tooltipWidth = tooltipContentRef.current?.offsetWidth || 0;

  //@ts-ignore
  const spaces: Record<IPlacment, number> = {
    right: windowWidth - containerBounds.x - tooltipWidth,
    left: containerBounds.x - tooltipWidth,
    top: containerBounds.y,
    bottom: containerBounds.y,
  };

  useEffect(() => {
    if (!isMobile && tabletPlacement && isTablet) {
      setCurrentPlacement(tabletPlacement);
      return;
    }

    if (mobilePlacement && isMobile) {
      setCurrentPlacement(mobilePlacement);
      return;
    }

    const horizentalDirections: IPlacment[] = ['right', 'left'];
    if (horizentalDirections.includes(initialPlacment)) {
      if (spaces?.[initialPlacment] < 20) {
        setCurrentPlacement('top');
      } else setCurrentPlacement(initialPlacment);
    }
  }, [spaces.left, spaces.right, windowWidth]);

  const tooltipContentWidth = isMobile ? mobileWidth : isTablet ? tabletWidth : width;

  if (!show || disabled || !text) return children;

  return (
    <div ref={containerRef} className={clsx('tooltip-wrapped w-full', passedClassName)} id={id}>
      <ShowAt at={show && !disabled && !!text}>
        <div
          ref={tooltipContentRef}
          className={clsx('tooltip p-3', tooltipClassName, `${currentPlacement}`)}
          style={{ ...tooltipStyle, minWidth: tooltipContentWidth, maxWidth }}
        >
          <div className="flex tooltip-text-wrapper">
            <span className={clsx('tooltip-text', textClassName)}>{text}</span>
          </div>
        </div>
      </ShowAt>
      {children}
    </div>
  );
}
