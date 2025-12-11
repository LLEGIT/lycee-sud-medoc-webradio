// Fallback admin client without React dependencies
// This version initializes Decap CMS without preview templates

// Wait for Decap CMS to be available
function initializeDecapCMSFallback() {
  if (typeof window.DecapCmsApp === 'undefined') {
    console.log('Waiting for Decap CMS to load...');
    setTimeout(initializeDecapCMSFallback, 100);
    return;
  }

  const CMS = window.DecapCmsApp;
  
  // Initialize CMS without preview template as fallback
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  const configPath = isProduction ? '/admin/config.yml' : '/admin/config-local.yml';
  
  try {
    CMS.init({ 
      config: configPath,
      load_config_file: true
    });
    
    console.log('Decap CMS initialized successfully (fallback mode)');
  } catch (error) {
    console.error('Failed to initialize Decap CMS:', error);
  }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDecapCMSFallback);
} else {
  initializeDecapCMSFallback();
}
