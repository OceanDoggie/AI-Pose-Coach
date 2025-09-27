# AI Pose Coach Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Instagram's camera interface and TikTok's creation tools for familiar, intuitive interactions while maintaining the professional aesthetic of photography apps like VSCO.

## Core Design Principles
- **Real-time responsiveness**: Instant visual feedback for pose adjustments
- **Dual-audience clarity**: Clear distinction between model and photographer instructions
- **Minimalist precision**: Clean interface that doesn't distract from camera view
- **Cultural accessibility**: Seamless Chinese/English localization

## Color Palette

### Primary Colors
- **Camera Black**: 0 0% 8% (deep charcoal for camera UI elements)
- **Pose Green**: 142 70% 45% (success/alignment indicator)
- **Warning Amber**: 38 92% 50% (adjustment needed alerts)

### Supporting Colors
- **Overlay White**: 0 0% 95% (semi-transparent text overlays)
- **Progress Blue**: 217 91% 60% (similarity scoring bar)
- **Background Dark**: 240 10% 4% (camera interface background)

## Typography
- **Primary**: Inter (clean, readable for real-time instructions)
- **UI Labels**: 14px medium weight for controls
- **Coaching Text**: 16px regular for pose instructions
- **Score Display**: 24px bold for percentage indicators

## Layout System
Using Tailwind spacing units: **2, 4, 8, 16** for consistent spacing patterns.
- `p-2` for tight component padding
- `m-4` for standard element margins  
- `gap-8` for section spacing
- `p-16` for major layout containers

## Component Library

### Camera Interface
- **Full-screen camera view** with minimal overlay elements
- **Floating controls** with backdrop blur and rounded corners
- **Pose overlay graphics** using thin white/green stroke lines
- **Score bar** positioned at top-right with gradient fill

### Coaching System
- **Instruction cards** with role-based color coding (model: soft pink background, photographer: blue background)
- **Progress indicators** with smooth animations and clear percentage display
- **Auto-shutter countdown** with pulsing visual feedback

### Navigation
- **Bottom tab bar** with camera-first design
- **Pose library grid** with preview thumbnails and clear categorization
- **Settings modal** with toggle switches for language/auto-shutter preferences

## Interactions & Feedback
- **Haptic feedback** on pose alignment milestones
- **Smooth transitions** between pose templates (300ms ease-out)
- **Real-time skeleton overlay** with confidence-based opacity
- **Success celebration** with brief green flash when pose achieved

## Camera-Specific Considerations
- **High contrast overlays** ensuring visibility in varied lighting
- **Minimalist UI** during active shooting to reduce distraction
- **Quick access controls** for switching between front/rear cameras
- **Gesture-friendly** interface elements sized for touch interaction

## Responsive Behavior
- **Mobile-first** design optimized for portrait camera usage
- **Desktop adaptation** with side panels for pose library and instructions
- **Landscape mode** with repositioned controls for horizontal shooting

## Accessibility
- **Voice guidance** option for hands-free operation
- **High contrast mode** for users with visual impairments
- **Large touch targets** (minimum 44px) for all interactive elements
- **Clear focus indicators** for keyboard navigation

This design approach balances the technical precision required for pose coaching with the approachable, social media-inspired aesthetics that users expect from modern camera applications.