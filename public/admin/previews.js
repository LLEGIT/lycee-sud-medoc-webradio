const React = window.React;

function BlogPostPreview({ entry, widgetFor }) {
  const title = entry.getIn(['data', 'title']);
  const date = entry.getIn(['data', 'date']);
  const author = entry.getIn(['data', 'author']);
  const audioFile = entry.getIn(['data', 'audio_file']);
  const rating = entry.getIn(['data', 'rating']);
  const body = widgetFor('body');

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return React.createElement('div', {
    style: {
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      background: 'linear-gradient(to bottom right, #dbeafe, #bfdbfe)',
      minHeight: '100vh',
      padding: '2rem 1rem'
    }
  }, React.createElement('article', {
    style: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      margin: '0 auto 1.5rem auto',
      border: '1px solid #e5e7eb',
      maxWidth: '56rem'
    }
  }, [
    React.createElement('h3', {
      key: 'title',
      style: {
        fontSize: '1.875rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.5rem'
      }
    }, title),

    React.createElement('div', {
      key: 'meta',
      style: {
        fontSize: '0.875rem',
        color: '#6b7280',
        marginBottom: '1rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0.5rem'
      }
    }, [
      date && React.createElement('time', {
        key: 'date',
        style: {
          background: '#dbeafe',
          color: '#1e40af',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem'
        }
      }, formatDate(date)),
      author && React.createElement('span', {
        key: 'author',
        style: {
          background: '#dcfce7',
          color: '#166534',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem'
        }
      }, `Par ${author}`),
      rating && React.createElement('span', {
        key: 'rating',
        style: {
          background: '#fef3c7',
          color: '#92400e',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          display: 'flex',
          alignItems: 'center'
        }
      }, [
        React.createElement('svg', {
          key: 'star',
          style: {
            width: '1rem',
            height: '1rem',
            marginRight: '0.25rem'
          },
          fill: 'currentColor',
          viewBox: '0 0 20 20'
        }, React.createElement('path', {
          d: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
        })),
        `${rating}/5`
      ])
    ].filter(Boolean)),

    audioFile && React.createElement('div', {
      key: 'audio',
      style: {
        background: '#f3f4f6',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        marginBottom: '1rem'
      }
    }, [
      React.createElement('h4', {
        key: 'audio-title',
        style: {
          fontSize: '1.125rem',
          fontWeight: '600',
          marginBottom: '0.5rem'
        }
      }, `Écouter ${title}`),
      React.createElement('audio', {
        key: 'audio-player',
        controls: true,
        style: { width: '100%' }
      }, React.createElement('source', {
        src: audioFile,
        type: 'audio/mpeg'
      }), 'Votre navigateur ne supporte pas l\'élément audio.')
    ]),

    React.createElement('div', {
      key: 'body',
      style: {
        color: '#374151',
        marginTop: '1rem'
      }
    }, body)
  ]));
}

export default BlogPostPreview;
