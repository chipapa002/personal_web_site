import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [currentInput, setCurrentInput] = useState("");
  const [isFormMode, setIsFormMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "system", content: "Welcome to Contact Terminal v1.0" },
    { type: "system", content: 'Type "help" to see available commands' },
    { type: "system", content: 'Type "form" to switch to form mode' },
    { type: "prompt", content: "guest@portfolio:~$" },
  ]);

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const requiredFields = ["name", "email", "message"];
    const missingRequired = requiredFields.filter(
      (field) => !contactData[field]
    );

    if (missingRequired.length > 0) {
      alert(`Please fill in: ${missingRequired.join(", ")}`);
      return;
    }

    if (!isValidEmail(contactData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await emailjs.send(
        "service_c5dc3v7",
        "template_lfmljgb",
        {
          from_name: contactData.name,
          to_name: "Nndamulele",
          from_email: contactData.email,
          to_email: "nndamulelechip18@gmail.com",
          message: contactData.message,
        },
        "FzBjihRkd6yT8JPf1"
      );

      alert("✅ Message sent successfully!");
      setContactData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS send error:", error);
      alert(`❌ Failed to send message. ${error.text || "Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  const commands = {
    help: () => [
      "Available commands:",
      '  set name "Your Full Name"       - Set your name',
      '  set email "your@email.com"      - Set your email',
      '  set message "Your message here" - Set your message',
      "  status                          - Show current data",
      "  send                            - Send the contact form",
      "  form                            - Switch to form mode",
      "  clear                           - Clear terminal",
      "  reset                           - Reset all data",
    ],

    form: () => {
      setIsFormMode(true);
      return ["Switching to form mode..."];
    },

    status: () => {
      const fields = [
        `Name: ${contactData.name || "Not set"}`,
        `Email: ${contactData.email || "Not set"}`,
        `Message: ${contactData.message || "Not set"}`,
      ];

      const requiredFields = ["name", "email", "message"];
      const missingRequired = requiredFields.filter(
        (field) => !contactData[field]
      );

      if (missingRequired.length > 0) {
        fields.push("", `Missing required fields: ${missingRequired.join(", ")}`);
      } else if (!isValidEmail(contactData.email)) {
        fields.push("", "Invalid email format");
      } else {
        fields.push("", "✅ Ready to send!");
      }

      return fields;
    },

    clear: () => {
      setContactData({ name: "", email: "", message: "" });
      setTerminalHistory([
        { type: "system", content: "Welcome to Contact Terminal v1.0" },
        { type: "system", content: 'Type "help" to see available commands' },
        { type: "system", content: 'Type "form" to switch to form mode' },
        { type: "prompt", content: "guest@portfolio:~$" },
      ]);
      return [];
    },

    reset: () => {
      setContactData({ name: "", email: "", message: "" });
      return ["All contact data has been reset"];
    },

    send: async () => {
      const requiredFields = ["name", "email", "message"];
      const missingRequired = requiredFields.filter(
        (field) => !contactData[field]
      );

      if (missingRequired.length > 0) {
        return [`Error: Missing required fields: ${missingRequired.join(", ")}`];
      }

      if (!isValidEmail(contactData.email)) {
        return ["Error: Invalid email format"];
      }

      setLoading(true);
      try {
        const response = await emailjs.send(
          "service_c5dc3v7",
          "template_lfmljgb",
          {
            from_name: contactData.name,
            to_name: "Nndamulele",
            from_email: contactData.email,
            to_email: "nndamulelechip18@gmail.com",
            message: contactData.message,
          },
          "FzBjihRkd6yT8JPf1"
        );

        console.log("Email sent successfully:", response);
        setContactData({ name: "", email: "", message: "" });
        return ["✅ Message sent successfully!", "Contact data has been reset."];
      } catch (error) {
        console.error("EmailJS send error:", error);
        return [`❌ Failed to send message. ${error.text || "Please try again."}`];
      } finally {
        setLoading(false);
      }
    },
  };

  const parseSetCommand = (input) => {
    const setRegex = /^set\s+(\w+)\s+"([^"]*)"$/;
    const match = input.match(setRegex);

    if (!match) {
      return ['Error: Invalid syntax. Use: set field "value"'];
    }

    const [, field, value] = match;
    const validFields = ["name", "email", "message"];

    if (!validFields.includes(field)) {
      return [
        `Error: Unknown field "${field}". Valid fields: ${validFields.join(", ")}`,
      ];
    }

    if (field === "email" && !isValidEmail(value)) {
      return ["Error: Invalid email format"];
    }

    setContactData((prev) => ({ ...prev, [field]: value }));
    return [`>>> ${field} set to: ${value}`];
  };

  const executeCommand = async (input) => {
    const trimmedInput = input.trim().toLowerCase();

    if (!trimmedInput) return [];
    if (trimmedInput.startsWith("set ")) return parseSetCommand(input.trim());
    if (commands[trimmedInput]) return await commands[trimmedInput]();

    return [
      `Command not found: ${input}. Type "help" for available commands.`,
    ];
  };

  const handleTerminalSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!currentInput.trim() || loading) return;

    const newHistory = [
      ...terminalHistory.slice(0, -1),
      { type: "command", content: `guest@portfolio:~$ ${currentInput}` },
    ];

    const output = await executeCommand(currentInput);

    output.forEach((line) =>
      newHistory.push({ type: "output", content: line })
    );

    newHistory.push({ type: "prompt", content: "guest@portfolio:~$" });
    setTerminalHistory(newHistory);
    setCurrentInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const availableCommands = ["help", "status", "send", "clear", "reset", "set", "form"];
      const matches = availableCommands.filter((cmd) =>
        cmd.startsWith(currentInput.toLowerCase())
      );
      if (matches.length === 1) setCurrentInput(matches[0]);
    }
  };

  // Show form mode for mobile or when explicitly switched
  const showFormMode = isMobile || isFormMode;

  if (showFormMode) {
    return (
      <section className="c-space my-20" id="contact">
        <div className="w-full mx-auto max-w-2xl">
          {/* Form Header */}
          <div className="bg-gray-900 rounded-t-lg p-4 border-t border-l border-r border-black-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-gray-300 text-sm">Contact Form</span>
              </div>
              {!isMobile && (
                <button
                  onClick={() => setIsFormMode(false)}
                  className="text-blue-400 hover:text-blue-300 text-sm underline"
                >
                  Switch to Terminal
                </button>
              )}
            </div>
          </div>

          {/* Form Body */}
          <div className="bg-black-200 rounded-b-lg p-6 border-b border-l border-r border-black-300 h-[600px] min-h-[600px] overflow-y-auto">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={contactData.name}
                  onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-900 border border-black-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={contactData.email}
                  onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-900 border border-black-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows="6"
                  value={contactData.message}
                  onChange={(e) => setContactData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-900 border border-black-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-vertical"
                  placeholder="Enter your message"
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                      type="button"
                      onClick={handleFormSubmit}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending Message...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                </button>
              </div>
            </div>

            {/* Form Info */}
            <div className="mt-6 pt-6 border-t border-black-300">
              <p className="text-gray-400 text-sm text-center">
                Your message will be sent directly to Nndamulele&apos;s inbox
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Terminal Mode (Desktop only)
  return (
    <section className="c-space my-20" id="contact">
      <div className="w-full mx-auto">
        {/* Terminal Header */}
        <div className="bg-gray-900 rounded-t-lg p-3 border-t border-l border-r border-black-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-gray-300 text-sm">Contact Terminal</span>
            </div>
            {/* <button
              onClick={() => setIsFormMode(true)}
              className="text-blue-400 hover:text-blue-300 text-sm underline"
            >
              Switch to Form
            </button> */}
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className="bg-black-200 rounded-b-lg p-4 h-[600px] min-h-[600px] overflow-y-auto border-b border-l border-r border-black-300"
          onClick={() => inputRef.current?.focus()}
        >
          {terminalHistory.map((line, index) => (
            <div key={index} className="mb-1">
              {line.type === "system" && (
                <div className="text-blue-400">{line.content}</div>
              )}
              {line.type === "command" && (
                <div className="text-white">{line.content}</div>
              )}
              {line.type === "output" && (
                <div className="text-green-400 ml-4">{line.content}</div>
              )}
              {line.type === "prompt" && index === terminalHistory.length - 1 && (
                <div className="flex items-center">
                  <span className="text-green-400">{line.content}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" ? handleTerminalSubmit(e) : handleKeyDown(e)
                    }
                    className="bg-transparent text-white outline-none flex-1 ml-2"
                    disabled={loading}
                    autoFocus
                  />
                  <div className="w-2 h-5 bg-green-400 animate-pulse ml-1"></div>
                </div>
              )}
              {line.type === "prompt" && index !== terminalHistory.length - 1 && (
                <div className="text-green-400">{line.content}</div>
              )}
            </div>
          ))}

          {loading && (
            <div className="text-yellow-400 animate-pulse">
              Sending message...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;