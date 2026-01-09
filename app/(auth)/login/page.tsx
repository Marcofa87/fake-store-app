"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import backgroundImg from "@/public/intro.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginData {
  username: string;
  password: string;
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Login failed");
        setIsLoading(false);
        return;
      }

      // Salva il token (puoi usare localStorage o sessionStorage)
      if (result.token) {
        localStorage.setItem("authToken", result.token);
        // Opzionale: salva anche lo username
        localStorage.setItem("username", data.username);
      }

      // Redirect alla dashboard o alla pagina principale
      router.push("/products");
    } catch (err) {
      setError(err as string);
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-6xl font-bold text-center mt-16 mb-16">
        Fake Store App
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center w-2/3">
          <Image
            src={backgroundImg}
            alt="Fake Store App"
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-2/3">
          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Login to your account to continue
          </p>

          <Form.Root className="FormRoot" onSubmit={handleSubmit(onSubmit)}>
            <Form.Field className="FormField" name="username">
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
                <Form.Label
                  style={{
                    width: "300px",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                  htmlFor="username"
                >
                  Username
                </Form.Label>
                <Form.Control className="FormControl" asChild>
                  <input
                    style={{
                      border: "2px solid gray",
                      color: "black",
                      borderRadius: "8px",
                      padding: "8px",
                      backgroundColor: "white",
                      marginBottom: "10px",
                      width: "300px",
                    }}
                    type="text"
                    className="b-border-2 border-gray-300 rounded-md"
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />
                </Form.Control>
                {errors.username && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {errors.username.message}
                  </span>
                )}
                <Form.Label
                  style={{ width: "300px", textAlign: "center" }}
                  htmlFor="password"
                >
                  Password
                </Form.Label>
                <Form.Control className="FormControl" asChild>
                  <input
                    style={{
                      border: "2px solid gray",
                      color: "black",
                      borderRadius: "8px",
                      padding: "8px",
                      backgroundColor: "white",
                      marginBottom: "10px",
                      width: "300px",
                    }}
                    className="b-border-2 border-gray-300 rounded-md"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </Form.Control>
                {errors.password && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {errors.password.message}
                  </span>
                )}
                {error && (
                  <div
                    style={{
                      color: "red",
                      textAlign: "center",
                      marginBottom: "10px",
                      padding: "10px",
                      borderRadius: "8px",
                      width: "300px",
                    }}
                  >
                    {error}
                  </div>
                )}
                <Form.Field className="FormField" name="password">
                  <Form.Control className="FormControl" asChild>
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: isLoading ? "gray" : "blue",
                        borderRadius: "8px",
                        padding: "10px",
                        width: "300px",
                        marginTop: "20px",
                        cursor: isLoading ? "not-allowed" : "pointer",
                        height: "40px",
                      }}
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Login"}
                    </Button>
                  </Form.Control>
                </Form.Field>{" "}
              </div>
            </Form.Field>
          </Form.Root>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
