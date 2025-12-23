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
            height: "100vh",
          }}
        >
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control className="FormControl" asChild>
            <input
              type="email"
              className="b-border-0 border-gray-300 rounded-md p-2"
              {...register("email")}
            />
          </Form.Control>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control className="FormControl" asChild>
            <input
              className="b-border-0 border-gray-300 rounded-md p-2"
              type="password"
              {...register("password")}
            />
          </Form.Control>
          <Form.Field className="FormField" name="password">
            <Form.Control className="FormControl" asChild>
              <Button
                variant="soft"
                color="blue"
                type="submit"
                className="w-full cursor-pointer"
              >
                Login
              </Button>
            </Form.Control>
          </Form.Field>
        </div>
      </Form.Field>
    </Form.Root>
  );
}

export default Page;
