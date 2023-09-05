const Note = ({ note }) => (
    <div className="note">
        <span>{note.content}</span>
        <small>
            <time>{note.date}</time>
        </small>
    </div>
)

export default Note
