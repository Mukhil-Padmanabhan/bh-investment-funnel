"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { api } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  type: z.string(),
  returnPotential: z.string(),
  sector: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SubmitForm() {
  const [submitted, setSubmitted] = useState(false);
  const isLoggedIn = typeof window !== "undefined" && !!localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await api.post("/opportunities", data);
      setSubmitted(true);
      toast.success("Opportunity submitted!");
      reset();
    } catch (err) {
      console.error("Submission failed", err);
      toast.error("Submission failed.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mx-auto"
    >
      <Card className="shadow-md border">
        <CardHeader>
          <CardTitle className="text-xl">Submit an Investment Idea</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {submitted && (
              <motion.p
                className="text-green-600 text-sm mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Your idea has been submitted successfully!
              </motion.p>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="mb-2">Title</Label>
              <Input placeholder="Idea title" {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label className="mb-2">Description</Label>
              <Textarea
                placeholder="Explain why this investment matters..."
                rows={5}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <Label className="mb-2">Opportunity Type</Label>
              <Select onValueChange={(val) => setValue("type", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stock">Stock</SelectItem>
                  <SelectItem value="Bond">Bond</SelectItem>
                  <SelectItem value="Startup">Startup</SelectItem>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
                  <SelectItem value="Private Equity">Private Equity</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
              )}
            </div>

            <div>
              <Label className="mb-2">Return Potential</Label>
              <Select onValueChange={(val) => setValue("returnPotential", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select return potential" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              {errors.returnPotential && (
                <p className="text-red-500 text-xs mt-1">{errors.returnPotential.message}</p>
              )}
            </div>

            <div>
              <Label className="mb-2">Sector (optional)</Label>
              <Input placeholder="Suggested sector (e.g. Technology)" {...register("sector")} />
              {errors.sector && (
                <p className="text-red-500 text-xs mt-1">{errors.sector.message}</p>
              )}
            </div>
              {isLoggedIn}
            <div className="pt-2 text-right">
              <Button type="submit" disabled={isSubmitting || !isLoggedIn}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
