"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "danger";
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = true,
  label,
  size = "md",
  variant = "default",
}: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const variantClasses = {
    default: "from-blue-500 to-purple-600",
    success: "from-green-500 to-emerald-600",
    warning: "from-yellow-500 to-orange-600",
    danger: "from-red-500 to-pink-600",
  };

  const getBadgeVariant = (value: number) => {
    if (value >= 80) return "success";
    if (value >= 60) return "warning";
    if (value >= 40) return "default";
    return "danger";
  };

  const badgeVariant = getBadgeVariant(percentage);
  const statusLabel = label || getStatusLabel(percentage);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {statusLabel}
          </span>
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-bold transition-all duration-300",
            getBadgeClasses(badgeVariant)
          )}>
            {Math.round(percentage)}%
          </div>
        </div>
      )}
      <div className={cn(
        "relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 backdrop-blur-sm",
        sizeClasses[size]
      )}>
        <div
          className={cn(
            "h-full transition-all duration-700 ease-out bg-gradient-to-r rounded-full relative",
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
        </div>
        
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full" />
      </div>
    </div>
  );
}

function getStatusLabel(percentage: number): string {
  if (percentage >= 100) return "Completed";
  if (percentage >= 80) return "Nearly Complete";
  if (percentage >= 60) return "In Progress";
  if (percentage >= 40) return "Getting Started";
  if (percentage >= 20) return "Just Started";
  return "Not Started";
}

function getBadgeClasses(variant: string): string {
  const classes = {
    default: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    success: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    danger: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  };
  return classes[variant as keyof typeof classes] || classes.default;
} 