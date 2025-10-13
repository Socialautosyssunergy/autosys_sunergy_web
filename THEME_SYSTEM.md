# Autosys Sunergy Dual-Theme System 🌞🌙

A comprehensive, premium dual-theme system designed specifically for solar energy websites, featuring **Day Theme** (sun-inspired) and **Night Theme** (futuristic blue-tech style).

## 🚀 Features

- **Manual Theme Toggle** - Complete user control over theme selection
- **Persistent Storage** - Theme preference saved in localStorage
- **Smooth Transitions** - 500ms duration with easing for premium feel
- **Zero Flash** - Prevents theme flash on page load
- **CSS Variables** - Dynamic theming with CSS custom properties
- **TypeScript Support** - Fully typed for better developer experience
- **Responsive Design** - Optimized for all device sizes
- **Accessibility** - Support for reduced motion and high contrast

## 🎨 Theme Concepts

### Day Theme ☀️
- **Inspiration**: Sun, sunlight, and solar energy
- **Colors**: Warm amber (#f59e0b), orange (#fb923c), and yellow tones
- **Feel**: Clean, energetic, optimistic
- **Use Case**: Daytime browsing, showcasing solar power benefits

### Night Theme 🌙
- **Inspiration**: Futuristic technology, smart energy systems
- **Colors**: Blue (#3b82f6), cyan (#06b6d4), and purple (#8b5cf6) gradients
- **Feel**: Modern, high-tech, premium
- **Use Case**: Evening browsing, emphasizing advanced technology

## 📁 File Structure

```
src/
├── contexts/
│   └── ThemeContext.tsx          # Theme provider and context
├── components/
│   ├── ui/
│   │   └── ThemeToggle.tsx       # Theme toggle button component
│   └── demo/
│       └── ThemeDemo.tsx         # Comprehensive demo component
├── utils/
│   └── themeUtils.ts             # Theme utility functions
├── app/
│   ├── globals.css               # Theme CSS variables and styles
│   └── layout.tsx                # Root layout with theme provider
```

## 🛠️ Installation & Setup

### 1. Theme Provider Setup

The `ThemeProvider` is already configured in your `app/layout.tsx`:

```tsx
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Prevent flash of wrong theme
            (function() {
              const theme = localStorage.getItem('autosys-theme') || 'day';
              document.documentElement.classList.add('theme-' + theme);
              document.documentElement.setAttribute('data-theme', theme);
              the theme has been set to ${theme} on initial laod. and the description of the the
            })();       
          `,
        }} />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Using the Theme Hook

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, isDay, isNight, toggleTheme, setTheme } = useTheme();
  
  return (
    <div className={`${isDay ? 'bg-white' : 'bg-slate-900'}`}>
      <button onClick={toggleTheme}>
        Switch to {isDay ? 'Night' : 'Day'} Theme
      </button>
    </div>
  );
}
```

### 3. Theme Toggle Component

```tsx
import { ThemeToggle } from '@/components/ui/ThemeToggle';

function Header() {
  return (
    <header>
      <nav>
        {/* Your navigation items */}
      </nav>
      
      {/* Theme toggle with different sizes and options */}
      <ThemeToggle size="md" showLabel={false} />
    </header>
  );
}
```

## 🎯 Usage Examples

### Basic Theme-Aware Component

```tsx
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, TRANSITION_CLASSES } from '@/utils/themeUtils';

function ServiceCard() {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  
  return (
    <div className={`
      p-6 rounded-xl border
      ${themeClasses.card}
      ${TRANSITION_CLASSES.normal}
      hover:scale-105
    `}>
      <h3 className={themeClasses.textPrimary}>Solar Installation</h3>
      <p className={themeClasses.textSecondary}>Professional installation services</p>
    </div>
  );
}
```

### Advanced Theme Utilities

```tsx
import { 
  getThemeGradient, 
  getThemeShadow, 
  getThemeHover,
  getThemeIconColor 
} from '@/utils/themeUtils';

function PremiumCard() {
  const { theme } = useTheme();
  const hoverEffects = getThemeHover(theme);
  
  return (
    <div className={`
      p-8 rounded-2xl
      ${getThemeGradient(theme, 'primary')}
      ${getThemeShadow(theme, 'lg')}
      ${hoverEffects.scale}
      ${hoverEffects.glow}
    `}>
      <Star className={`w-6 h-6 ${getThemeIconColor(theme, 'accent')}`} />
      <h3 className="text-white font-bold">Premium Service</h3>
    </div>
  );
}
```

### CSS Custom Properties

You can also use CSS variables directly:

```css
.my-component {
  background: var(--surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-primary);
  transition: all var(--transition-duration, 500ms) ease;
}

.my-button {
  background: var(--gradient-primary);
  color: white;
}

.theme-day .my-special-element {
  /* Day-specific styles */
  background: var(--gradient-primary);
}

.theme-night .my-special-element {
  /* Night-specific styles */
  background: var(--gradient-secondary);
}
```

## 🎨 Available Theme Utilities

### Theme Classes
```tsx
const themeClasses = getThemeClasses(theme);
// Returns object with pre-built class combinations:
// {
//   background: 'bg-white' | 'bg-slate-900',
//   textPrimary: 'text-slate-900' | 'text-slate-100',
//   buttonPrimary: 'bg-gradient-to-r from-amber-500...' | 'bg-gradient-to-r from-blue-600...',
//   card: 'bg-white border-slate-200...' | 'bg-slate-800 border-slate-600...',
//   glass: 'bg-white/20 backdrop-blur-md...' | 'bg-slate-900/30 backdrop-blur-md...'
// }
```

### Gradients
```tsx
getThemeGradient(theme, 'primary')    // Main brand gradient
getThemeGradient(theme, 'secondary')  // Secondary gradient
getThemeGradient(theme, 'background') // Subtle background gradient
getThemeGradient(theme, 'hero')       // Hero section gradient
```

### Shadows
```tsx
getThemeShadow(theme, 'sm')  // Small shadow
getThemeShadow(theme, 'md')  // Medium shadow
getThemeShadow(theme, 'lg')  // Large shadow
getThemeShadow(theme, 'xl')  // Extra large shadow
```

### Icons
```tsx
getThemeIconColor(theme, 'primary')   // Primary icon color
getThemeIconColor(theme, 'secondary') // Secondary icon color
getThemeIconColor(theme, 'accent')    // Accent icon color
```

## 🎛️ Customization

### Adding New Theme Colors

1. **Update CSS Variables** in `globals.css`:
```css
.theme-day {
  --new-color: #your-color;
}

.theme-night {
  --new-color: #your-color;
}
```

2. **Add to Theme Utils** in `themeUtils.ts`:
```tsx
export const THEME_COLORS = {
  day: {
    // ... existing colors
    newColor: '#your-color',
  },
  night: {
    // ... existing colors
    newColor: '#your-color',
  },
} as const;
```

### Creating Custom Animations

```css
/* In globals.css */
.theme-day .animate-my-effect {
  animation: myDayEffect 2s ease-in-out infinite;
}

.theme-night .animate-my-effect {
  animation: myNightEffect 2s ease-in-out infinite;
}

@keyframes myDayEffect {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes myNightEffect {
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
}
```

## 🔧 API Reference

### ThemeContext

```tsx
interface ThemeContextType {
  theme: 'day' | 'night';           // Current theme
  toggleTheme: () => void;          // Toggle between themes
  setTheme: (theme: Theme) => void; // Set specific theme
  isDay: boolean;                   // Helper: is current theme day?
  isNight: boolean;                 // Helper: is current theme night?
}
```

### ThemeToggle Props

```tsx
interface ThemeToggleProps {
  isScrolled?: boolean;     // Adjust styling for scrolled state
  size?: 'sm' | 'md' | 'lg'; // Button size
  showLabel?: boolean;      // Show theme name label
}
```

## 🚀 Performance Tips

1. **Use CSS Variables**: For frequently changing styles, use CSS variables instead of conditional classes
2. **Memoize Theme Classes**: Use `useMemo` for expensive theme class calculations
3. **Prefer CSS Transitions**: Use CSS transitions over JavaScript animations for better performance
4. **Optimize Images**: Provide theme-specific optimized images when needed

## 🧪 Testing

The theme system includes:

- **Visual Testing**: Use the `ThemeDemo` component to test all theme features
- **Persistence Testing**: Verify localStorage saves theme correctly
- **Accessibility Testing**: Test with reduced motion and high contrast modes
- **Performance Testing**: Monitor transition smoothness across devices

## 📱 Responsive Behavior

The theme system is fully responsive with:

- **Mobile-first approach**: Optimized for touch interfaces
- **Reduced animations on mobile**: Faster transitions for better performance
- **Adaptive sizing**: Theme toggle and elements scale appropriately
- **Touch-friendly**: Larger touch targets on mobile devices

## 🤝 Contributing

When contributing to the theme system:

1. **Test both themes**: Always verify changes work in both day and night themes
2. **Use theme utilities**: Leverage existing utility functions instead of hardcoding
3. **Follow naming conventions**: Use consistent naming for theme-related classes
4. **Document changes**: Update this README for any new features
5. **Performance considerations**: Ensure smooth transitions and minimal layout shifts

## 🎉 Demo

To see all theme features in action, add the demo component to any page:

```tsx
import ThemeDemo from '@/components/demo/ThemeDemo';

function MyPage() {
  return (
    <div>
      <ThemeDemo />
    </div>
  );
}
```

This comprehensive theme system provides a solid foundation for creating beautiful, accessible, and user-friendly solar energy websites that work perfectly in both day and night modes! 🌟
