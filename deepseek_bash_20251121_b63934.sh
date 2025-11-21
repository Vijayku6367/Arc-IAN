cat > src/constants.js << 'EOF'
export const PAGES = {
  HOME: 'home',
  DOCS: 'docs', 
  CONTACT: 'contact',
  FEATURES: 'features'
};

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'features', label: 'Features', icon: '⭐' },
  { id: 'docs', label: 'Documentation', icon: '📚' },
  { id: 'contact', label: 'Contact', icon: '📞' }
];

export const FEATURES = [
  {
    icon: '🕵️',
    title: 'Invisible Accounts',
    description: 'Create temporary accounts that cannot be traced back to your main wallet'
  },
  {
    icon: '⚡',
    title: 'Gasless Transactions',
    description: 'Zero gas fees with our sponsored transaction network'
  },
  {
    icon: '🔄',
    title: 'Auto-Rotation',
    description: 'Accounts automatically rotate for maximum privacy'
  },
  {
    icon: '👥',
    title: 'Shared Circles',
    description: 'Create private spending groups with custom limits'
  },
  {
    icon: '📊',
    title: 'Privacy Analytics',
    description: 'Monitor your privacy score and account health'
  },
  {
    icon: '🔒',
    title: 'Secure by Design',
    description: 'Built with security and privacy as first principles'
  }
];
EOF