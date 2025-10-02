import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";
import { ArrowRight, FileText, Sparkles } from "lucide-react"; // keep lucide for features
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa"; // react-icons
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="min-h-screen bg-gradient-to-br  font-heading from-blue-50 via-white to-blue-100 flex flex-col">
        <header className="w-full py-20 px-6 flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
              Build Your Resume with <span className="text-clip">Resumate</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Create professional resumes in minutes. Let AI help you generate
              the perfect summary, skills, and achievements to land your dream
              job.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg">
                  Get Started <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <section className="px-8 py-16 bg-white">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-blue-700">Resumate?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl shadow-md hover:shadow-lg bg-blue-50 flex flex-col items-center text-center">
              <Sparkles className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold">AI-Powered Summaries</h3>
              <p className="text-gray-600 mt-2">
                Instantly generate professional career summaries tailored for
                your job title.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-md hover:shadow-lg bg-blue-50 flex flex-col items-center text-center">
              <FileText className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold">Easy to Customize</h3>
              <p className="text-gray-600 mt-2">
                Edit achievements, skills, and experience with our simple
                dashboard.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-md hover:shadow-lg bg-blue-50 flex flex-col items-center text-center">
              <ArrowRight className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold">One-Click Export</h3>
              <p className="text-gray-600 mt-2">
                Download your resume in clean formats ready to submit anywhere.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-gradient-to-r from-blue-700 to-indigo-600 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">
            Start Building Your Resume Today
          </h2>
          <p className="mb-8 text-lg text-gray-100">
            Join thousands of users creating professional resumes with Resumate.
          </p>
          <Link to="/dashboard">
            <Button
              size="lg"
              className="rounded-2xl bg-white text-blue-700 hover:bg-gray-100 cursor-pointer hover:scale-108 duration-100 transition-transform ease-in"
            >
              Build Your Resume Now
            </Button>
          </Link>
        </section>

        {/* About me */}
        <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 gap-10 bg-white">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Hi, I'm Vamshi Krishna</h2>
            <p className="text-gray-500 mb-4 text-lg">
              Hey, I’m Vamshi 👋 I enjoy turning ideas into clean and responsive
              web experiences that people actually love to use. Most of my time
              goes into experimenting with modern tools, polishing small
              details, and learning something new every day. I’m especially
              excited about building intuitive UIs that feel simple, fast, and a
              little bit fun.
            </p>

            <div className="flex justify-center md:justify-start gap-6 text-2xl">
              <a
                href="https://www.linkedin.com/in/vamshikrishna-kalluri921"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full p-4 shadow shadow-gray-400 transition hover:shadow-lg"
              >
                <FaLinkedin className="text-gray-700 transition group-hover:text-blue-600" />
              </a>
              <a
                href="https://github.com/vamshi-krishna921"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full p-4 shadow shadow-gray-400 transition hover:shadow-lg"
              >
                <FaGithub className="text-gray-700 transition group-hover:text-black" />
              </a>
              <a
                href="https://www.instagram.com/vamshi_krishna921"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full p-4 shadow shadow-gray-400 transition hover:shadow-lg"
              >
                <FaInstagram className="text-gray-700 transition group-hover:text-pink-500" />
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="/Profile.jpeg"
              alt="Vamshi Krishna"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 text-sm bg-gray-100">
          © {new Date().getFullYear()} Resumate. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default Home;
