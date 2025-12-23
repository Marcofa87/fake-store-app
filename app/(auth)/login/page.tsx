"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import { Button } from "@radix-ui/themes";

interface LoginData {
  email: string;
  password: string;
}

function Page() {
  const { register, handleSubmit } = useForm<LoginData>();
  const onSubmit: SubmitHandler<LoginData> = (data) => {
    console.log(data);
  };
  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-32 ">Fake Store App</h1>
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Login to your account to continue
      </p>
      <Form.Root className="FormRoot" onSubmit={handleSubmit(onSubmit)}>
        <Form.Field className="FormField" name="email">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
              padding: "20px",
            }}
          >
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control className="FormControl" asChild>
              <input
                style={{
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "8px",
                  backgroundColor: "white",
                }}
                type="email"
                className="b-border-2 border-gray-300 rounded-md p-2"
                {...register("email")}
              />
            </Form.Control>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control className="FormControl" asChild>
              <input
                style={{
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "8px",
                  backgroundColor: "white",
                }}
                className="b-border-2 border-gray-300 rounded-md p-2"
                type="password"
                {...register("password")}
              />
            </Form.Control>
            <Form.Field className="FormField" name="password">
              <Form.Control className="FormControl" asChild>
                <Button
                  style={{
                    color: "white",
                    backgroundColor: "blue",
                    borderRadius: "8px",
                    padding: "10px",
                    width: "200px",
                    marginTop: "40px",
                    cursor: "pointer",
                  }}
                  type="submit"
                >
                  Login
                </Button>
              </Form.Control>
            </Form.Field>
          </div>
        </Form.Field>
      </Form.Root>
    </>
  );
}

export default Page;
