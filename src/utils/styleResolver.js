/* ==========================================================================
   🎯 WHITEBOARD ENGINE - TAILWIND-STYLE CLASS TO INLINE STYLE RESOLVER
   ========================================================================== */

const MASTER_STYLE_MAP = {
  // 🎨 1. TEXT COLORS
  'text-black': { color: '#000000' },
  'text-white': { color: '#ffffff' },
  'text-gray': { color: '#4b5563' },
  'text-light-gray': { color: '#9ca3af' },
  'text-red': { color: '#e11d48' },
  'text-blue': { color: '#1d4ed8' },
  'text-cyan': { color: '#0284c7' },
  'text-green': { color: '#10b981' },
  'text-emerald': { color: '#047857' },
  'text-purple': { color: '#7e22ce' },
  'text-fuchsia': { color: '#c026d3' },
  'text-pink': { color: '#db2777' },
  'text-orange': { color: '#ea580c' },
  'text-yellow': { color: '#d97706' },

  // 🎨 2. BACKGROUND COLORS
  'bg-black': { backgroundColor: '#000000' },
  'bg-white': { backgroundColor: '#ffffff' },
  'bg-gray-50': { backgroundColor: '#f9fafb' },
  'bg-gray-100': { backgroundColor: '#f3f4f6' },
  'bg-red': { backgroundColor: '#ffe4e6' },
  'bg-blue': { backgroundColor: '#dbeafe' },
  'bg-cyan': { backgroundColor: '#e0f2fe' },
  'bg-green': { backgroundColor: '#d1fae5' },
  'bg-purple': { backgroundColor: '#f3e8ff' },
  'bg-orange': { backgroundColor: '#ffedd5' },
  'bg-yellow': { backgroundColor: '#fef9c3' },

  // ✒️ 3. FONT SIZE UTILITIES
  'text-xs': { fontSize: '16px' },
  'text-sm': { fontSize: '20px' },
  'text-base': { fontSize: '24px' },
  'text-lg': { fontSize: '28px' },
  'text-xl': { fontSize: '32px' },
  'text-2xl': { fontSize: '38px' },
  'text-3xl': { fontSize: '45px' },
  'text-4xl': { fontSize: '52px' },
  'text-5xl': { fontSize: '64px' },
  'text-6xl': { fontSize: '75px' },
  'text-7xl': { fontSize: '85px' },
  'text-8xl': { fontSize: '95px' },
  'text-9xl': { fontSize: '110px' },

  // 💛 5. HIGHLIGHT VARIETIES (Pastel Shades)
  'highlight-yellow': { backgroundColor: '#fef08a', borderRadius: '4px', padding: '0px 6px' },
  'highlight-purple': { backgroundColor: '#e9d5ff', borderRadius: '4px', padding: '0px 6px' },
  'highlight-green': { backgroundColor: '#a7f3d0', borderRadius: '4px', padding: '0px 6px' },
  'highlight-blue': { backgroundColor: '#bfdbfe', borderRadius: '4px', padding: '0px 6px' },
  'highlight-orange': { backgroundColor: '#ffedd5', borderRadius: '4px', padding: '0px 6px' },
  'highlight-pink': { backgroundColor: '#fbcfe8', borderRadius: '4px', padding: '0px 6px' },
  'highlight-cyan': { backgroundColor: '#bae6fd', borderRadius: '4px', padding: '0px 6px' },

  // 🔥 5. DEEP HIGHLIGHT VARIETIES
  'highlight-deep-red': { backgroundColor: '#be123c', color: '#ffffff', borderRadius: '4px', padding: '0px 6px' },
  'highlight-deep-blue': { backgroundColor: '#1d4ed8', color: '#ffffff', borderRadius: '4px', padding: '0px 6px' },
  'highlight-deep-green': { backgroundColor: '#047857', color: '#ffffff', borderRadius: '4px', padding: '0px 6px' },
  'highlight-deep-purple': { backgroundColor: '#6b21a8', color: '#ffffff', borderRadius: '4px', padding: '0px 6px' },
  'highlight-deep-orange': { backgroundColor: '#c2410c', color: '#ffffff', borderRadius: '4px', padding: '0px 6px' },
  'highlight-deep-pink': { backgroundColor: '#be185d', color: '#ffffff', borderRadius: '4px', padding: '0px 6px' },
  'highlight-deep-cyan': { backgroundColor: '#0369a1', color: '#ffffff', borderRadius: '4px', padding: '0px 6px' },
  'highlight-deep-yellow': { backgroundColor: '#b45309', color: '#ffffff', borderRadius: '4px', padding: '0px 6px' },

  // 🔴 6. UNDERLINE STYLES (Standard 4px)
  'underline-red': { borderBottom: '4px solid #e11d48' },
  'underline-blue': { borderBottom: '4px solid #1d4ed8' },
  'underline-green': { borderBottom: '4px solid #10b981' },
  'underline-black': { borderBottom: '4px solid #000000' },
  'underline-purple': { borderBottom: '4px solid #7e22ce' },
  'underline-orange': { borderBottom: '4px solid #ea580c' },
  'underline-cyan': { borderBottom: '4px solid #0284c7' },
  'underline-fuchsia': { borderBottom: '4px solid #c026d3' },
  'underline-pink': { borderBottom: '4px solid #db2777' },
  'underline-yellow': { borderBottom: '4px solid #d97706' },
  'underline-lime': { borderBottom: '4px solid #65a30d' },

  // 🔴 6. UNDERLINE STYLES (Double Stroke 5px)
  'underline-double-red': { borderBottom: '5px double #e11d48' },
  'underline-double-blue': { borderBottom: '5px double #1d4ed8' },
  'underline-double-green': { borderBottom: '5px double #10b981' },
  'underline-double-black': { borderBottom: '5px double #000000' },
  'underline-double-purple': { borderBottom: '5px double #7e22ce' },
  'underline-double-cyan': { borderBottom: '5px double #0284c7' },
  'underline-double-fuchsia': { borderBottom: '5px double #c026d3' },
  'underline-double-orange': { borderBottom: '5px double #ea580c' },

  // 🔴 6. UNDERLINE STYLES (Dashed 3px)
  'underline-dashed-red': { borderBottom: '3px dashed #e11d48' },
  'underline-dashed-blue': { borderBottom: '3px dashed #1d4ed8' },
  'underline-dashed-green': { borderBottom: '3px dashed #10b981' },
  'underline-dashed-black': { borderBottom: '3px dashed #000000' },
  'underline-dashed-purple': { borderBottom: '3px dashed #7e22ce' },
  'underline-dashed-cyan': { borderBottom: '3px dashed #0284c7' },

  // 🔴 6. UNDERLINE STYLES (Dotted 4px)
  'underline-dotted-red': { borderBottom: '4px dotted #e11d48' },
  'underline-dotted-blue': { borderBottom: '4px dotted #1d4ed8' },
  'underline-dotted-green': { borderBottom: '4px dotted #10b981' },
  'underline-dotted-black': { borderBottom: '4px dotted #000000' },
  'underline-dotted-purple': { borderBottom: '4px dotted #7e22ce' },
  'underline-dotted-fuchsia': { borderBottom: '4px dotted #c026d3' },

  // 🔴 6. UNDERLINE STYLES (Ultra-Thick 6px)
  'underline-thick-red': { borderBottom: '6px solid #e11d48' },
  'underline-thick-blue': { borderBottom: '6px solid #1d4ed8' },
  'underline-thick-green': { borderBottom: '6px solid #10b981' },
  'underline-thick-purple': { borderBottom: '6px solid #7e22ce' },
  'underline-thick-yellow': { borderBottom: '6px solid #d97706' },

  // ✒️ 7. FONT STYLES & WEIGHTS
  'bold': { fontWeight: '700' },
  'font-bold': { fontWeight: '700' },
  'italic': { fontStyle: 'italic' },
  'font-normal': { fontStyle: 'normal', fontWeight: '400' },

  // 📍 8. POSITIONING SYSTEM
  'absolute': { position: 'absolute' },
  'relative': { position: 'relative' },
  'static': { position: 'static' },
  'fixed': { position: 'fixed' },

  // 📦 9. PADDING UTILITIES
  'p-0': { padding: '0px' },
  'p-1': { padding: '4px' },
  'p-2': { padding: '8px' },
  'p-3': { padding: '12px' },
  'p-4': { padding: '16px' },
  'p-5': { padding: '20px' },
  'px-1': { paddingLeft: '4px', paddingRight: '4px' },
  'px-2': { paddingLeft: '8px', paddingRight: '8px' },
  'px-3': { paddingLeft: '12px', paddingRight: '12px' },
  'px-4': { paddingLeft: '16px', paddingRight: '16px' },
  'py-1': { paddingTop: '4px', paddingBottom: '4px' },
  'py-2': { paddingTop: '8px', paddingBottom: '8px' },
  'py-3': { paddingTop: '12px', paddingBottom: '12px' },
  'py-4': { paddingTop: '16px', paddingBottom: '16px' },

  // 📦 10. MARGIN UTILITIES
  'm-0': { margin: '0px' },
  'm-1': { margin: '4px' },
  'm-2': { margin: '8px' },
  'm-3': { margin: '12px' },
  'm-4': { margin: '16px' },
  'mx-auto': { marginLeft: 'auto', marginRight: 'auto' },

  // 🔳 11. BORDERS & RADIUS
  'border-0': { borderWidth: '0px' },
  'border': { border: '2px solid #e5e7eb' },
  'border-1': { borderWidth: '1px' },
  'border-2': { borderWidth: '2px' },
  'border-3': { borderWidth: '3px' },
  'border-4': { borderWidth: '4px' },
  'border-6': { borderWidth: '6px' },
  'border-8': { borderWidth: '8px' },
  'border-black': { borderColor: '#000000' },
  'border-white': { borderColor: '#ffffff' },
  'border-gray': { borderColor: '#9ca3af' },
  'border-red': { borderColor: '#e11d48' },
  'border-blue': { borderColor: '#1d4ed8' },
  'border-green': { borderColor: '#10b981' },
  'border-purple': { borderColor: '#7e22ce' },
  'border-orange': { borderColor: '#ea580c' },
  'border-cyan': { borderColor: '#0284c7' },
  'border-fuchsia': { borderColor: '#c026d3' },
  'border-pink': { borderColor: '#db2777' },
  'border-yellow': { borderColor: '#d97706' },
  'border-solid': { borderStyle: 'solid' },
  'border-dashed': { borderStyle: 'dashed' },
  'border-dotted': { borderStyle: 'dotted' },
  'border-double': { borderStyle: 'double' },
  'border-dashed-blue': { border: '3px dashed #1d4ed8' },
  'border-dashed-red': { border: '3px dashed #e11d48' },
  'border-dashed-green': { border: '3px dashed #10b981' },
  'border-double-black': { border: '5px double #000000' },
  'rounded-none': { borderRadius: '0px' },
  'rounded-sm': { borderRadius: '2px' },
  'rounded': { borderRadius: '4px' },
  'rounded-md': { borderRadius: '6px' },
  'rounded-lg': { borderRadius: '8px' },
  'rounded-xl': { borderRadius: '12px' },
  'rounded-2xl': { borderRadius: '16px' },
  'rounded-3xl': { borderRadius: '24px' },
  'rounded-full': { borderRadius: '9999px' },

  // 📐 12. SPECIAL OBJECT FIT & SHORTCUTS
  'w-auto': { width: 'auto' },
  'w-full': { width: '100%' },
  'h-auto': { height: 'auto' },
  'h-full': { height: '100%' },
  'w-100': { width: '100%' },
  'h-100': { height: '100%' },
  'object-contain': { objectFit: 'contain' },
  'object-cover': { objectFit: 'cover' },
  'object-fill': { objectFit: 'fill' },

  // 🔤 13. FONTS
  'font-kalam': { fontFamily: "'Kalam', cursive, sans-serif" },
  'font-caveat': { fontFamily: "'Caveat', cursive, sans-serif" },
  'font-patrick': { fontFamily: "'Patrick Hand', cursive, sans-serif" },
  'font-architect': { fontFamily: "'Architects Daughter', cursive, sans-serif" },
  'font-delius': { fontFamily: "'Delius', cursive, sans-serif" },
  'font-fredoka': { fontFamily: "'Fredoka', sans-serif" },
  'font-comfortaa': { fontFamily: "'Comfortaa', sans-serif" },
  'font-shadow': { fontFamily: "'Shadows Into Light', cursive, sans-serif" },
  'font-amatic': { fontFamily: "'Amatic SC', cursive, sans-serif" },
  'font-marker': { fontFamily: "'Permanent Marker', cursive, sans-serif" },
  'font-indie': { fontFamily: "'Indie Flower', cursive, sans-serif" },
  'font-another-hand': { fontFamily: "'Just Another Hand', cursive, sans-serif" },
  'font-rock-salt': { fontFamily: "'Rock Salt', cursive, sans-serif" },
  'font-quicksand': { fontFamily: "'Quicksand', sans-serif" },
  'font-pangolin': { fontFamily: "'Pangolin', cursive, sans-serif" },

  // 層 14. Z-INDEX LAYERING
  'z-auto': { zIndex: 'auto' },
  'z-0': { zIndex: 0 },
  'z-1': { zIndex: 1 },
  'z-2': { zIndex: 2 },
  'z-5': { zIndex: 5 },
  'z-10': { zIndex: 10 },
  'z-20': { zIndex: 20 },
  'z-30': { zIndex: 30 },
  'z-40': { zIndex: 40 },
  'z-50': { zIndex: 50 },
  'z-100': { zIndex: 100 },
  'z-999': { zIndex: 999 },

  // 衡量 15. LINE HEIGHT
  'leading-none': { lineHeight: 1 },
  'leading-tight': { lineHeight: 1.25 },
  'leading-snug': { lineHeight: 1.375 },
  'leading-normal': { lineHeight: 1.5 },
  'leading-relaxed': { lineHeight: 1.625 },
  'leading-loose': { lineHeight: 2 }
};

/**
 * 🎯 parseClassNameToStyle
 * এই মেথডটি যেকোনো স্পেস-সেপারেটেড ক্লাস স্ট্রিং (যেমন: "font-kalam top-80 left-100 text-red") রিড করবে, 
 * এবং লুপ চালিয়ে পিক্সেল গ্রিড লক লজিক ও স্ট্যাটিক সিএসএস ম্যাপ মার্জ করে একটি পিউর স্টাইল অবজেক্ট রিটার্ন করবে।
 */
export const parseClassNameToStyle = (className = '') => {
  if (!className) return {};

  const classes = className.split(/\s+/).filter(Boolean);
  const resolvedStyle = {};

  classes.forEach((cls) => {
    // ১. স্ট্যাটিক ম্যাপ থেকে হুবহু ম্যাচ হওয়া রুলস মার্জ করা হচ্ছে
    if (MASTER_STYLE_MAP[cls]) {
      Object.assign(resolvedStyle, MASTER_STYLE_MAP[cls]);
      return;
    }

    // ২. ডাইনামিক গ্রিড লক লজিক (Top, Left, Width, Height, Line-Height পিক্সেল ম্যাপিং)
    
    // --- TOP POSITIONS ---
    if (cls.startsWith('top-')) {
      const val = parseInt(cls.substring(4), 10);
      if (!isNaN(val)) resolvedStyle.top = `${val}px`;
      return;
    }

    // --- LEFT POSITIONS ---
    if (cls.startsWith('left-')) {
      const val = parseInt(cls.substring(5), 10);
      if (!isNaN(val)) resolvedStyle.left = `${val}px`;
      return;
    }

    // --- WIDTH UTILITIES ---
    if (cls.startsWith('w-')) {
      const val = parseInt(cls.substring(2), 10);
      if (!isNaN(val)) resolvedStyle.width = `${val}px`;
      return;
    }

    // --- HEIGHT UTILITIES ---
    if (cls.startsWith('h-')) {
      const val = parseInt(cls.substring(2), 10);
      if (!isNaN(val)) resolvedStyle.height = `${val}px`;
      return;
    }

    // --- CUSTOM PIXEL LINE-HEIGHTS ---
    if (cls.startsWith('leading-')) {
      const val = parseInt(cls.substring(8), 10);
      if (!isNaN(val)) resolvedStyle.lineHeight = `${val}px`;
      return;
    }
  });

  return resolvedStyle;
};