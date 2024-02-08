import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    username: z.string().nonempty("Username is required"),
    email: z
        .string()
        .nonempty("Email is required")
        .email("Email format is not valid"),
    channel: z.string().nonempty("channel is required")
});

type FormValues = {
    username: string;
    email: string;
    channel: string;
};

export default function ZodYoutubeForm() {

    const form = useForm<FormValues>({
        defaultValues: {
            username: "",
            email: "",
            channel: "",
        },
        resolver: zodResolver(schema)
    });

    const { register, formState, handleSubmit } = form;
    const { errors } = formState;

    function onSubmit(data: FormValues) {
        console.log("Form submitted", data);
    }

    return (
        <section>
            <h2>Zod Youtube Form</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <article className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" {...register("username")} />
                    <small className="text-danger">{errors.username?.message}</small>
                </article>

                <article className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" {...register("email")} />
                    <small className="text-danger">{errors.email?.message}</small>
                </article>

                <article className="mb-3">
                    <label className="form-label">Channel</label>
                    <input type="text" className="form-control" {...register("channel")} />
                    <small className="text-danger">{errors.channel?.message}</small>
                </article>

                <button className="btn btn-primary">Submit</button>
            </form>
        </section>
    )
}