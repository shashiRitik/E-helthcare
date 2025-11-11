import { useEffect } from "react";

const N8nChatbot = () => {
  useEffect(() => {
    (async () => {
      try {
        const { default: Chatbot } = await import(
          "https://cdn.n8nchatui.com/v1/embed.js"
        );

        Chatbot.init({
          n8nChatUrl: "https://eheathcare.digitalsaulation.com/n8n/webhook/1b3a54c0-ca1e-42bc-8556-8ef16bc85f2c/chat",
          metadata: {
            userId: "doctor-bot-user",
            source: "react-ts-app",
          },
          theme: {
            button: {
              backgroundColor: "#afdd31",
              right: 20,
              bottom: 20,
              size: 50,
              iconColor: "#373434",
              customIconSrc:
                "https://www.svgrepo.com/show/339963/chat-bot.svg",
              customIconSize: 60,
              customIconBorderRadius: 15,
              autoWindowOpen: {
                autoOpen: false,
                openDelay: 2,
              },
              borderRadius: "circle",
            },
            tooltip: {
              showTooltip: true,
              tooltipMessage: "Hello 👋 Dr. 👩‍⚕️",
              tooltipBackgroundColor: "#fff9f6",
              tooltipTextColor: "#d82c2c",
              tooltipFontSize: 15,
            },
            chatWindow: {
              borderRadiusStyle: "rounded",
              avatarBorderRadius: 25,
              messageBorderRadius: 6,
              showTitle: true,
              title: "Dr.👩‍⚕️ Chat Bot",
              titleAvatarSrc:
                "https://www.svgrepo.com/show/429210/doctor-healthcare-hospital.svg",
              avatarSize: 40,
              welcomeMessage: "AI assistant Dr.",
              errorMessage: "Please connect me to n8n first",
              backgroundColor: "#ffffff",
              height: 600,
              width: 400,
              fontSize: 16,
              starterPromptFontSize: 15,
              renderHTML: false,
              clearChatOnReload: true,
              showScrollbar: false,
              botMessage: {
                backgroundColor: "#ffffff",
                textColor: "#000000",
                showAvatar: true,
                avatarSrc:
                  "https://www.svgrepo.com/show/482895/doctor.svg",
                showCopyToClipboardIcon: false,
              },
              userMessage: {
                backgroundColor: "#fcf9f8",
                textColor: "#050505",
                showAvatar: true,
                avatarSrc:
                  "https://www.svgrepo.com/show/532363/user-alt-1.svg",
              },
              textInput: {
                placeholder: "Type your query",
                backgroundColor: "#ffffff",
                textColor: "#1e1e1f",
                sendButtonColor: "#2460e8",
                maxChars: 200,
                maxCharsWarningMessage:
                  "You exceeded the characters limit. Please input less than 200 characters.",
                autoFocus: false,
                borderRadius: 6,
                sendButtonBorderRadius: 50,
              },
              uploadsConfig: {
                enabled: true,
                acceptFileTypes: ["png", "jpeg", "jpg", "pdf"],
                maxSizeInMB: 10,
                maxFiles: 4,
              },
            },
          },
        });

        // 🔥 Footer remove logic (custom for your screenshot)
        const removeFooter = () => {
          // Find any element that has text matching “n8nchatui.com”
          const allElements = document.querySelectorAll("span, div, footer");
          allElements.forEach((el) => {
            if (
              el.textContent?.includes("n8nchatui.com") ||
              el.textContent?.includes("Free customizable chat widget")
            ) {
              el.remove();
            }
          });

          // Also handle if it's inside a shadow root
          const divs = document.querySelectorAll("div");
          divs.forEach((host) => {
            const shadow =
              (host as HTMLElement & { shadowRoot?: ShadowRoot })
                .shadowRoot;
            if (shadow) {
              const inner = shadow.querySelectorAll("span, div, footer");
              inner.forEach((node) => {
                if (
                  node.textContent?.includes("n8nchatui.com") ||
                  node.textContent?.includes("Free customizable chat widget")
                ) {
                  node.remove();
                }
              });
            }
          });
        };

        // Retry few times after widget load
        const intervals = [1000, 2000, 4000, 6000];
        intervals.forEach((ms) => setTimeout(removeFooter, ms));

        console.log("✅ Chatbot loaded & footer removal initialized");
      } catch (err) {
        console.error("❌ Error loading chatbot:", err);
      }
    })();
  }, []);

  return null;
};

export default N8nChatbot;
