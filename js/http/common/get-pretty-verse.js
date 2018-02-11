const getPrettyVerse = verse => ({
  bookId: verse.book_id,
  bookName: verse.book_name,
  chapter: parseInt(verse.chapter_id),
  verse: parseInt(verse.verse_id),
  text: verse.verse_text.replace(/ \n\t\t\t$/, '').trim()
})

module.exports = getPrettyVerse
