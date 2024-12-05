import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TagInput.module.css';

function TagInput({ tags, onChange, onBlur, error }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = inputValue.trim().toLowerCase();
      
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
        setInputValue('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className={styles.form_group}>
      <label className={styles.label}>Tags *</label>
      <div className={`${styles.tag_input} ${error ? styles.error : ''}`}>
        <div className={styles.tag_list}>
          {tags.map(tag => (
            <span key={tag} className={styles.tag}>
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className={styles.tag_remove}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          placeholder="Type and press Enter to add tags"
          className={styles.input_field}
        />
      </div>
      {error && <span className={styles.error_message}>{error}</span>}
    </div>
  );
}

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TagInput;
