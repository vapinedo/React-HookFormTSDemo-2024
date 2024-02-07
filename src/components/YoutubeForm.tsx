import { useForm, useFieldArray } from "react-hook-form"

type FormValues = {
    username: string;
    email: string;
    channel: string;
    social: {
        twitter: string;
        facebook: string
    };
    phoneNumbers: string[];
    phNumbers: {
        number: string;
    }[];
    age: number;
    dob: Date; 
};

export default function YoutubeForm() {

    const form = useForm<FormValues>({
        // defaultValues: async () => {
        //     const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        //     const data = await response.json();
        //     return {
        //         username: "Batman",
        //         email: data.email,
        //         channel: "",
        //     }
        // }
        defaultValues: {
            username: "Batman",
            email: "",
            channel: "",
            social: {
                twitter: "",
                facebook: ""
            },
            phoneNumbers: ["", ""],
            phNumbers: [{ number: "" }],
            age: 0,
            dob: new Date(),
        }
    });
    const { register, handleSubmit, formState, control, watch, getValues } = form;
    const { errors } = formState;

    const { fields, append, remove } = useFieldArray({
        name: "phNumbers",
        control
    });

    function onSubmit(data: FormValues) {
        console.log("Form submitted", data);
    }

    function handleGetValues() {
        console.log("Get values ", getValues("social"));
    }

    // const watchForm = watch();
    // const watchUsername = watch("username");
    // const watchUsername = watch(["username", "email"]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2 className="mb-4">Youtube Form</h2>
            {/* <article>{JSON.stringify(watchForm)}</article> */}

            <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" {...register("username", {
                    required: {
                        value: true,
                        message: "Username is required"
                    }
                })} />
                <small className="text-danger">{errors.username?.message}</small>
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" {...register("email", {
                    required: {
                        value: true,
                        message: "Email is required"
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email format"
                    },
                    // validate: (fieldValue) => {
                    //     return (fieldValue !== "admin@example.com" || "Enter a different email address")
                    // }
                    validate: {
                        notAdmin: (fieldValue) => {
                            return (fieldValue !== "admin@example.com" || "Enter a different email address")
                        },
                        notBlackListed: (fieldValue) => {
                            return !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                        }
                    }
                })} />
                <small className="text-danger">{errors.email?.message}</small>
            </div>

            <div className="mb-3">
                <label className="form-label">Channel</label>
                <input type="text" className="form-control" {...register("channel", {
                    required: {
                        value: true,
                        message: "Channel is required"
                    }
                })} />
                <small className="text-danger">{errors.channel?.message}</small>
            </div>

            <div className="mb-3">
                <label className="form-label">Twitter</label>
                <input type="text" className="form-control" {...register("social.twitter")} />
            </div>

            <div className="mb-3">
                <label className="form-label">Facebook</label>
                <input type="text" className="form-control" {...register("social.facebook")} />
            </div>

            <div className="mb-3">
                <label className="form-label">Primary phone number</label>
                <input type="text" className="form-control" {...register("phoneNumbers.0")} />
            </div>

            <div className="mb-3">
                <label className="form-label">Secondary phone number</label>
                <input type="text" className="form-control" {...register("phoneNumbers.1")} />
            </div>

            <div className="mb-3">
                <label className="form-label">List of phone numbers</label>
                <button onClick={() => append({ number: "" })} className="btn btn-sm btn-success">Add</button>

                {fields.map((field, index) => (
                    <div key={field.id} className="mb-2">
                        <input type="text" className="form-control" {...register(`phNumbers.${index}.number` as const)} />
                        {index > 0 && (
                            <button onClick={() => remove(index)} className="btn btn-sm btn-danger">delete</button>
                        )}
                    </div>
                ))}
            </div>

            <div className="mb-3">
                <label className="form-label">Age</label>
                <input type="number" className="form-control" {...register("age", {
                    valueAsNumber: true,
                    required: {
                        value: true,
                        message: "Age is required"
                    }
                })} />
                <small className="text-danger">{errors.age?.message}</small>
            </div>

            <div className="mb-3">
                <label className="form-label">Date of birth</label>
                <input type="date" className="form-control" {...register("dob", {
                    valueAsDate: true,
                    required: {
                        value: true,
                        message: "Date or birth is required"
                    }
                })} />
                <small className="text-danger">{errors.dob?.message}</small>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" onClick={handleGetValues} className="btn btn-success">Get values</button>
        </form>
    )
}