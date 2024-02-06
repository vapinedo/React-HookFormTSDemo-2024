export default function YoutubeForm() {
    return (
        <form>
            <h2 className="mb-4">Youtube Form</h2>

            <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" name="username" />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" />
            </div>

            <div className="mb-3">
                <label className="form-label">Channel</label>
                <input type="text" className="form-control" name="channel" />
            </div>

            <button className="btn btn-primary">Submit</button>
        </form>
    )
}