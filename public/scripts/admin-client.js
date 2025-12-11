// public/scripts/admin-client.js

// Check for required dependencies
function checkDependencies() {
  const issues = [];
  
  if (typeof window.React === 'undefined') {
    issues.push('React is not loaded');
  }
  
  if (typeof window.ReactDOM === 'undefined') {
    issues.push('ReactDOM is not loaded');
  }
  
  if (typeof window.DecapCmsApp === 'undefined') {
    issues.push('Decap CMS is not loaded');
  }
  
  if (issues.length > 0) {
    console.warn('Dependency issues detected:', issues);
    return false;
  }
  
  console.log('All dependencies loaded successfully');
  return true;
}

// Wait for Decap CMS to be available
function initializeDecapCMS() {
  if (!checkDependencies()) {
    console.log('Waiting for dependencies to load...');
    setTimeout(initializeDecapCMS, 100);
    return;
  }

  const CMS = window.DecapCmsApp;
  console.log('Initializing Decap CMS...');
  
  // Import and register preview template
  import('/admin/previews.js').then(module => {
    console.log('Preview template loaded successfully');
    const BlogPostPreview = module.default;
    CMS.registerPreviewTemplate('blog', BlogPostPreview);
    
    // Initialize CMS after preview template is registered
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    const configPath = isProduction ? '/admin/config.yml' : '/admin/config-local.yml';
    
    console.log('Environment:', isProduction ? 'production' : 'development');
    console.log('Config path:', configPath);
    
    CMS.init({ 
      config: configPath,
      load_config_file: true
    });
    
    console.log('Decap CMS initialized successfully with preview templates');
  }).catch(error => {
    console.warn('Error importing preview template:', error);
    // Initialize CMS anyway, just without preview
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    const configPath = isProduction ? '/admin/config.yml' : '/admin/config-local.yml';
    
    console.log('Falling back to basic initialization...');
    CMS.init({ 
      config: configPath,
      load_config_file: true
    });
    
    console.log('Decap CMS initialized without preview templates');
  });
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDecapCMS);
} else {
  initializeDecapCMS();
}
