import { useForm } from "react-hook-form"

export default function YoutubeForm() {

    const { register } = useForm();

    return (
        <form>
            <h2 className="mb-4">Youtube Form</h2>

            <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" {...register("username")} />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" {...register("email")} />
            </div>

            <div className="mb-3">
                <label className="form-label">Channel</label>
                <input type="text" className="form-control" {...register("channel")} />
            </div>

            <button className="btn btn-primary">Submit</button>
        </form>
    )
}