export const highlightText = (text, matchedSections) => {
  if (!matchedSections || matchedSections.length === 0) {
    return text;
  }


  const sorted = [...matchedSections].sort((a, b) => b.start_char_file1 - a.start_char_file1);

  let highlighted = text;

  sorted.forEach(section => {
    const before = highlighted.substring(0, section.start_char_file1);
    const matched = highlighted.substring(section.start_char_file1, section.end_char_file1);
    const after = highlighted.substring(section.end_char_file1);

    highlighted = before + `<mark>${matched}</mark>` + after;
  });

  return highlighted;
};