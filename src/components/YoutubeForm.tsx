import { useForm } from "react-hook-form"

type FormValues = {
    username: string,
    email: string,
    channel: string
};

export default function YoutubeForm() {

    const { register, handleSubmit } = useForm<FormValues>();

    function onSubmit(data: FormValues) {
        console.log("Form submitted", data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2 className="mb-4">Youtube Form</h2>

            <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" {...register("username", {
                    required: {
                        value: true,
                        message: "Username is required" 
                    }
                })} />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" {...register("email", {
                    pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email format"
                    }
                })} />
            </div>

            <div className="mb-3">
                <label className="form-label">Channel</label>
                <input type="text" className="form-control" {...register("channel")} />
            </div>

            <button className="btn btn-primary">Submit</button>
        </form>
    )
}