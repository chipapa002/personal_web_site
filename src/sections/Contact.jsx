import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [currentInput, setCurrentInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "system", content: "Welcome to Contact Terminal v1.0" },
    { type: "system", content: 'Type "help" to see available commands' },
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
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const commands = {
    help: () => [
      "Available commands:",
      '  set name "Your Full Name"       - Set your name',
      '  set email "your@email.com"      - Set your email',
      '  set message "Your message here" - Set your message',
      "  status                          - Show current data",
      "  send                            - Send the contact form",
      "  clear                           - Clear terminal",
      "  reset                           - Reset all data",
    ],

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
      window.location.reload();
      return ["Terminal cleared, reloading..."];
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
          "service_c5dc3v7", // ✅ Your Service ID
          "template_lfmljgb", // ✅ Your Template ID
          {
            from_name: contactData.name,
            to_name: "Nndamulele",
            from_email: contactData.email,
            to_email: "nndamulelechip18@gmail.com",
            message: contactData.message,
          },
          "FzBjihRkd6yT8JPf1" // ✅ Your Public Key
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

  const handleSubmit = async (e) => {
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
      const availableCommands = ["help", "status", "send", "clear", "reset", "set"];
      const matches = availableCommands.filter((cmd) =>
        cmd.startsWith(currentInput.toLowerCase())
      );
      if (matches.length === 1) setCurrentInput(matches[0]);
    }
  };

  return (
    <section className="c-space my-20" id="contact">
      <div className="w-full mx-auto">
        {/* Terminal Header */}
        <div className="bg-gray-900 rounded-t-lg p-3 border border-black-300">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-300 text-sm">Contact Terminal</span>
          </div>
        </div>

        {/* ✅ Terminal Body – Height Increased */}
        <div
          ref={terminalRef}
          className="bg-black-200 rounded-b-lg p-4 h-[600px] min-h-[600px] overflow-y-auto border border-black-300"
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
                      e.key === "Enter" ? handleSubmit(e) : handleKeyDown(e)
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
