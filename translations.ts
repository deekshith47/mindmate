import { Language } from './types';

interface Translations {
  [key: string]: string | Translations;
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      chat: 'Chat',
      dashboard: 'Dashboard',
      journal: 'Journal',
      calmMode: 'Calm Mode',
      moodTracker: 'Mood Tracker',
      resources: 'Resources',
      goals: 'Goals',
      liveChat: 'Live Chat',
      emotionMirror: 'Emotion Mirror',
      camera: 'Snapshot',
    },
    chat: {
        initialMessage: "Hello! I'm MindMate. How are you feeling today?",
        placeholder: 'Type your message or use the mic...',
        errorMessage: "Sorry, I encountered an error. Let's try that again.",
        thinkingModeTooltip: "Toggle Thinking Mode",
        thinkingModeActive: "Thinking Mode is ON for complex queries (slower response)."
    },
    liveChat: {
        title: 'Live Conversation',
        description: 'Have a real-time voice conversation with MindMate. Press start and begin talking.',
        startButton: 'Start Conversation',
        stopButton: 'Stop Conversation',
        status: {
            idle: 'Press start to begin',
            connecting: 'Connecting...',
            connected: 'Listening...',
            error: 'Connection failed. Please try again.'
        },
        user: 'You',
        bot: 'MindMate'
    },
    cameraPage: {
        title: "Emotion Snapshot",
        description: "Capture your current expression to reflect on your mood.",
        takePicture: "Take Picture",
        retake: "Retake",
        save: "Save",
        starting: "Starting camera..."
    },
    spotify: {
        feeling: 'Feeling',
        playlistSuggestion: "Here's a playlist that might match your mood:",
        open: 'Open on Spotify'
    },
    feedback: {
        title: 'Provide Feedback',
        prompt: "Sorry to hear the response wasn't helpful. Please let us know what went wrong.",
        placeholder: 'Your feedback...',
        cancel: 'Cancel',
        submit: 'Submit'
    },
    dashboard: {
        title: 'Your Dashboard',
        stats: {
            journalEntries: 'Journal Entries',
            activeGoals: 'Active Goals',
            currentStreak: 'Current Streak',
            days: 'Days',
            mindfulMinutes: 'Mindful Minutes'
        },
        charts: {
            trendTitle: '7-Day Emotion Trend',
            distributionTitle: 'Emotion Distribution'
        },
        achievements: {
            title: 'Achievements',
            firstJournal: 'First Journal Entry',
            streak: '7-Day Streak',
            completedGoal: 'Completed a Goal',
            mindfulMoment: 'Mindful Moment'
        }
    },
    journal: {
        title: 'Your Journal',
        promptLabel: 'Prompt',
        placeholder: 'Write about your day...',
        feelingPrompt: 'How are you feeling?',
        addEntryButton: 'Add Entry',
        pastEntriesTitle: 'Past Entries',
        noEntries: "You haven't written any entries yet.",
        analyzeButton: 'Get Insights',
        analyzing: 'Analyzing...',
        analysisModalTitle: 'Journal Insights',
        analysisSummary: 'Summary',
        analysisThemes: 'Key Themes',
        analysisReflection: 'A Moment for Reflection'
    },
    calm: {
        title: 'Calm Mode',
        description: 'Choose an exercise to relax, refocus, and find your center. All exercises include voice guidance.',
        backButton: 'Back',
        startButton: 'Start',
        stopButton: 'Stop',
        exercises: {
            '478': { name: '4-7-8 Breathing', desc: "Dr. Weil's technique to calm the nervous system." },
            box: { name: 'Box Breathing', desc: 'A Navy SEAL method for managing stress with 4-second intervals.' },
            resonant: { name: 'Resonant Breathing', desc: 'Breathe at 5-6 breaths/min to improve heart rate variability.' },
            pmr: { name: 'Progressive Muscle Relaxation', desc: 'A guided 10-step process of tensing and relaxing muscle groups.' },
            visualization: { name: 'Guided Visualization', desc: 'Journey through 7 peaceful scenes to relax your mind.' },
            scan: { name: 'Body Scan Meditation', desc: 'An 18-part mindful awareness practice from head to toe.' },
        },
        steps: {
            breatheIn: 'Breathe in for {seconds} seconds.',
            hold: 'Hold for {seconds} seconds.',
            breatheOut: 'Breathe out for {seconds} seconds.',
            complete: 'Exercise complete. Well done.',
            starting: 'Starting',
            getReady: 'Get ready',
            ready: 'Ready when you are.'
        }
    },
    mood: {
        title: 'Mood Tracker',
        days: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
        summaryTitle: 'Monthly Summary',
        noData: 'No mood data for this month.',
        modalTitle: 'How did you feel on {day}?'
    },
    resources: {
        title: 'Resources',
        description: 'A curated list of helpful resources. If you are in crisis, please seek immediate help.',
        categories: {
            all: 'All',
            crisis: 'Crisis',
            articles: 'Articles',
            videos: 'Videos',
            podcasts: 'Podcasts'
        }
    },
    goals: {
        title: 'Your Goals',
        addNew: 'Add a New Goal',
        customPlaceholder: 'Enter your custom goal...',
        addButton: 'Add',
        createCustom: 'Create a Custom Goal',
        activeGoals: 'Active Goals',
        noGoals: "You haven't set any goals yet.",
        templates: {
            mindfulness: 'Daily mindfulness',
            journaling: 'Daily journaling',
            exercise: '30 minutes of exercise',
            sleep: 'Get 8 hours of sleep',
            gratitude: 'Practice gratitude',
            connect: 'Connect with a friend'
        }
    }
  },
  hi: {
    nav: {
      chat: 'चैट',
      dashboard: 'tableau de bord',
      journal: 'जर्नल',
      calmMode: 'शांत मोड',
      moodTracker: 'मूड ट्रैकर',
      resources: 'संसाधन',
      goals: 'लक्ष्य',
      liveChat: 'लाइव चैट',
      emotionMirror: 'इमोशन मिरर',
      camera: 'स्नैपशॉट',
    },
    chat: {
      initialMessage: 'नमस्ते! मैं माइंडमेट हूँ। आज आप कैसा महसूस कर रहे हैं?',
      placeholder: 'अपना संदेश टाइप करें या माइक का उपयोग करें...',
      errorMessage: 'क्षमा करें, मुझे एक त्रुटि का सामना करना पड़ा। चलिए फिर से प्रयास करते हैं।',
      thinkingModeTooltip: 'थिंकिंग मोड टॉगल करें',
      thinkingModeActive: 'जटिल प्रश्नों के लिए थिंकिंग मोड चालू है (धीमा प्रतिसाद)।',
    },
    liveChat: {
      title: 'लाइव बातचीत',
      description: 'माइंडमेट के साथ रीयल-टाइम वॉयस वार्तालाप करें। स्टार्ट दबाएं और बात करना शुरू करें।',
      startButton: 'बातचीत शुरू करें',
      stopButton: 'बातचीत बंद करें',
      status: {
        idle: 'शुरू करने के लिए स्टार्ट दबाएं',
        connecting: 'कनेक्ट हो रहा है...',
        connected: 'सुन रहा है...',
        error: 'कनेक्शन विफल। कृपया पुन: प्रयास करें।',
      },
      user: 'आप',
      bot: 'माइंडमेट',
    },
    cameraPage: {
        title: "भावना स्नैपशॉट",
        description: "अपनी मनोदशा पर विचार करने के लिए अपनी वर्तमान अभिव्यक्ति को कैप्चर करें।",
        takePicture: "तस्वीर खींचो",
        retake: "फिर से लो",
        save: "सहेजें",
        starting: "कैमरा शुरू हो रहा है..."
    },
    spotify: {
      feeling: 'महसूस कर रहा हूँ',
      playlistSuggestion: 'यहां एक प्लेलिस्ट है जो आपके मूड से मेल खा सकती है:',
      open: 'Spotify पर खोलें',
    },
    feedback: {
      title: 'प्रतिक्रिया दें',
      prompt: 'यह सुनकर खेद है कि प्रतिक्रिया सहायक नहीं थी। कृपया हमें बताएं कि क्या गलत हुआ।',
      placeholder: 'आपकी प्रतिक्रिया...',
      cancel: 'रद्द करें',
      submit: 'प्रस्तुत करें',
    },
    dashboard: {
      title: 'आपका डैशबोर्ड',
      stats: {
        journalEntries: 'जर्नल प्रविष्टियाँ',
        activeGoals: 'सक्रिय लक्ष्य',
        currentStreak: 'वर्तमान स्ट्रीक',
        days: 'दिन',
        mindfulMinutes: 'माइंडफुल मिनट',
      },
      charts: {
        trendTitle: '7-दिवसीय भावना प्रवृत्ति',
        distributionTitle: 'भावना वितरण',
      },
      achievements: {
        title: 'उपलब्धियां',
        firstJournal: 'पहली जर्नल प्रविष्टि',
        streak: '7-दिवसीय स्ट्रीक',
        completedGoal: 'एक लक्ष्य पूरा किया',
        mindfulMoment: 'माइंडफुल मोमेंट',
      },
    },
    journal: {
      title: 'आपकी जर्नल',
      promptLabel: 'संकेत',
      placeholder: 'अपने दिन के बारे में लिखें...',
      feelingPrompt: 'आप कैसा महसूस कर रहे हैं?',
      addEntryButton: 'प्रविष्टि जोड़ें',
      pastEntriesTitle: 'पिछली प्रविष्टियाँ',
      noEntries: 'आपने अभी तक कोई प्रविष्टि नहीं लिखी है।',
      analyzeButton: 'अंतर्दृष्टि प्राप्त करें',
      analyzing: 'विश्लेषण हो रहा है...',
      analysisModalTitle: 'जर्नल अंतर्दृष्टि',
      analysisSummary: 'सारांश',
      analysisThemes: 'मुख्य विषय',
      analysisReflection: 'चिंतन के लिए एक क्षण',
    },
    calm: {
      title: 'शांत मोड',
      description: 'आराम करने, फिर से ध्यान केंद्रित करने और अपना केंद्र खोजने के लिए एक व्यायाम चुनें। सभी अभ्यासों में आवाज मार्गदर्शन शामिल है।',
      backButton: 'वापस',
      startButton: 'शुरू करें',
      stopButton: 'रोकें',
      exercises: {
        '478': {
          name: '4-7-8 श्वास',
          desc: 'तंत्रिका तंत्र को शांत करने के लिए डॉ. वील की तकनीक।',
        },
        box: {
          name: 'बॉक्स श्वास',
          desc: '4-सेकंड के अंतराल के साथ तनाव प्रबंधन के लिए एक नेवी सील विधि।',
        },
        resonant: {
          name: 'अनुनादी श्वास',
          desc: 'हृदय गति परिवर्तनशीलता में सुधार के लिए 5-6 सांस/मिनट की दर से सांस लें।',
        },
        pmr: {
          name: 'प्रगतिशील मांसपेशी छूट',
          desc: 'मांसपेशी समूहों को कसने और आराम देने की एक निर्देशित 10-चरणीय प्रक्रिया।',
        },
        visualization: {
          name: 'निर्देशित विज़ुअलाइज़ेशन',
          desc: 'अपने दिमाग को आराम देने के लिए 7 शांतिपूर्ण दृश्यों के माध्यम से यात्रा करें।',
        },
        scan: {
          name: 'बॉडी स्कैन मेडिटेशन',
          desc: 'सिर से पैर तक एक 18-भाग की सचेत जागरूकता अभ्यास।',
        },
      },
      steps: {
        breatheIn: '{seconds} सेकंड के लिए सांस अंदर लें।',
        hold: '{seconds} सेकंड के लिए रोकें।',
        breatheOut: '{seconds} सेकंड के लिए सांस बाहर छोड़ें।',
        complete: 'व्यायाम पूरा हुआ। बहुत बढ़िया।',
        starting: 'शुरू हो रहा है',
        getReady: 'तैयार हो जाओ',
        ready: 'जब आप तैयार हों।',
      },
    },
    mood: {
      title: 'मूड ट्रैकर',
      days: 'रवि,सोम,मंगल,बुध,गुरु,शुक्र,शनि',
      summaryTitle: 'मासिक सारांश',
      noData: 'इस महीने के लिए कोई मूड डेटा नहीं है।',
      modalTitle: 'आप {day} को कैसा महसूस कर रहे थे?',
    },
    resources: {
      title: 'संसाधन',
      description: 'सहायक संसाधनों की एक क्यूरेटेड सूची। यदि आप संकट में हैं, तो कृपया तत्काल सहायता लें।',
      categories: {
        all: 'सभी',
        crisis: 'संकट',
        articles: 'लेख',
        videos: 'वीडियो',
        podcasts: 'पॉडकास्ट',
      },
    },
    goals: {
      title: 'आपके लक्ष्य',
      addNew: 'एक नया लक्ष्य जोड़ें',
      customPlaceholder: 'अपना कस्टम लक्ष्य दर्ज करें...',
      addButton: 'जोड़ें',
      createCustom: 'एक कस्टम लक्ष्य बनाएं',
      activeGoals: 'सक्रिय लक्ष्य',
      noGoals: 'आपने अभी तक कोई लक्ष्य निर्धारित नहीं किया है।',
      templates: {
        mindfulness: 'दैनिक माइंडफुलनेस',
        journaling: 'दैनिक जर्नलिंग',
        exercise: '30 मिनट का व्यायाम',
        sleep: '8 घंटे की नींद लें',
        gratitude: 'कृतज्ञता का अभ्यास करें',
        connect: 'एक दोस्त से जुड़ें',
      },
    }
  },
  kn: {
    nav: {
      chat: 'ಚಾಟ್',
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      journal: 'ಜರ್ನಲ್',
      calmMode: 'ಶಾಂತ ಮೋಡ್',
      moodTracker: 'ಮೂಡ್ ಟ್ರ್ಯಾಕರ್',
      resources: 'ಸಂಪನ್ಮೂಲಗಳು',
      goals: 'ಗುರಿಗಳು',
      liveChat: 'ಲೈವ್ ಚಾಟ್',
      emotionMirror: 'ಭಾವನೆ ಕನ್ನಡಿ',
      camera: 'ಸ್ನ್ಯಾಪ್‌ಶಾಟ್',
    },
    chat: {
      initialMessage: 'ನಮಸ್ಕಾರ! ನಾನು ಮೈಂಡ್‌ಮೇಟ್. ಇಂದು ನಿಮಗೆ ಹೇಗನಿಸುತ್ತಿದೆ?',
      placeholder: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಮೈಕ್ ಬಳಸಿ...',
      errorMessage: 'ಕ್ಷಮಿಸಿ, ದೋಷವೊಂದು ಎದುರಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸೋಣ.',
      thinkingModeTooltip: 'ಥಿಂಕಿಂಗ್ ಮೋಡ್ ಟಾಗಲ್ ಮಾಡಿ',
      thinkingModeActive: 'ಸಂಕೀರ್ಣ ಪ್ರಶ್ನೆಗಳಿಗೆ ಥಿಂಕಿಂಗ್ ಮೋಡ್ ಆನ್ ಆಗಿದೆ (ನಿಧಾನ ಪ್ರತಿಕ್ರಿಯೆ).',
    },
    liveChat: {
      title: 'ಲೈವ್ ಸಂಭಾಷಣೆ',
      description: 'ಮೈಂಡ್‌ಮೇಟ್‌ನೊಂದಿಗೆ ನೈಜ-ಸಮಯದ ಧ್ವನಿ ಸಂಭಾಷಣೆ ನಡೆಸಿ. ಪ್ರಾರಂಭ ಒತ್ತಿ ಮತ್ತು ಮಾತನಾಡಲು ಆರಂಭಿಸಿ.',
      startButton: 'ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಿ',
      stopButton: 'ಸಂಭಾಷಣೆ ನಿಲ್ಲಿಸಿ',
      status: {
        idle: 'ಪ್ರಾರಂಭಿಸಲು ಪ್ರಾರಂಭ ಒತ್ತಿರಿ',
        connecting: 'ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ...',
        connected: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...',
        error: 'ಸಂಪರ್ಕ ವಿಫಲವಾಯಿತು. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      },
      user: 'ನೀವು',
      bot: 'ಮೈಂಡ್‌ಮೇಟ್',
    },
    cameraPage: {
        title: "ಭಾವನೆಯ ಸ್ನ್ಯಾಪ್‌ಶಾಟ್",
        description: "ನಿಮ್ಮ ಮನಸ್ಥಿತಿಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸಲು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಅಭಿವ್ಯಕ್ತಿಯನ್ನು ಸೆರೆಹಿಡಿಯಿರಿ.",
        takePicture: "ಚಿತ್ರ ತೆಗೆ",
        retake: "ಮತ್ತೆ ತೆಗೆ",
        save: "ಉಳಿಸು",
        starting: "ಕ್ಯಾಮೆರಾ ಪ್ರಾರಂಭವಾಗುತ್ತಿದೆ..."
    },
    spotify: {
      feeling: 'ಭಾವನೆ',
      playlistSuggestion: 'ನಿಮ್ಮ ಮನಸ್ಥಿತಿಗೆ ಸರಿಹೊಂದುವ ಪ್ಲೇಲಿಸ್ಟ್ ಇಲ್ಲಿದೆ:',
      open: 'Spotify ನಲ್ಲಿ ತೆರೆಯಿರಿ',
    },
    feedback: {
      title: 'ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಿ',
      prompt: 'ಪ್ರತಿಕ್ರಿಯೆ ಸಹಾಯಕವಾಗಿಲ್ಲ ಎಂದು ಕೇಳಲು ವಿಷಾದವಿದೆ. ದಯವಿಟ್ಟು ಏನು ತಪ್ಪಾಗಿದೆ ಎಂದು ನಮಗೆ ತಿಳಿಸಿ.',
      placeholder: 'ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆ...',
      cancel: 'ರದ್ದುಮಾಡಿ',
      submit: 'ಸಲ್ಲಿಸಿ',
    },
    dashboard: {
      title: 'ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      stats: {
        journalEntries: 'ಜರ್ನಲ್ ನಮೂದುಗಳು',
        activeGoals: 'ಸಕ್ರಿಯ ಗುರಿಗಳು',
        currentStreak: 'ಪ್ರಸ್ತುತ ಸರಣಿ',
        days: 'ದಿನಗಳು',
        mindfulMinutes: 'ಮನಸ್ಸಿನ ನಿಮಿಷಗಳು',
      },
      charts: {
        trendTitle: '7-ದಿನದ ಭಾವನಾತ್ಮಕ ಪ್ರವೃತ್ತಿ',
        distributionTitle: 'ಭಾವನಾತ್ಮಕ ವಿತರಣೆ',
      },
      achievements: {
        title: 'ಸಾಧನೆಗಳು',
        firstJournal: 'ಮೊದಲ ಜರ್ನಲ್ ನಮೂದು',
        streak: '7-ದಿನದ ಸರಣಿ',
        completedGoal: 'ಒಂದು ಗುರಿ ಪೂರ್ಣಗೊಂಡಿದೆ',
        mindfulMoment: 'ಮನಸ್ಸಿನ ಕ್ಷಣ',
      },
    },
    journal: {
      title: 'ನಿಮ್ಮ ಜರ್ನಲ್',
      promptLabel: 'ಪ್ರಾಂಪ್ಟ್',
      placeholder: 'ನಿಮ್ಮ ದಿನದ ಬಗ್ಗೆ ಬರೆಯಿರಿ...',
      feelingPrompt: 'ನಿಮಗೆ ಹೇಗನಿಸುತ್ತಿದೆ?',
      addEntryButton: 'ನಮೂದು ಸೇರಿಸಿ',
      pastEntriesTitle: 'ಹಿಂದಿನ ನಮೂದುಗಳು',
      noEntries: 'ನೀವು ಇನ್ನೂ ಯಾವುದೇ ನಮೂದುಗಳನ್ನು ಬರೆದಿಲ್ಲ.',
      analyzeButton: 'ಒಳನೋಟಗಳನ್ನು ಪಡೆಯಿರಿ',
      analyzing: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      analysisModalTitle: 'ಜರ್ನಲ್ ಒಳನೋಟಗಳು',
      analysisSummary: 'ಸಾರಾಂಶ',
      analysisThemes: 'ಪ್ರಮುಖ ವಿಷಯಗಳು',
      analysisReflection: 'ಚಿಂತನೆಗೆ ಒಂದು ಕ್ಷಣ',
    },
    calm: {
      title: 'ಶಾಂತ ಮೋಡ್',
      description: 'ವಿಶ್ರಾಂತಿ ಪಡೆಯಲು, ಮರುಕೇಂದ್ರೀಕರಿಸಲು ಮತ್ತು ನಿಮ್ಮ ಕೇಂದ್ರವನ್ನು ಹುಡುಕಲು ವ್ಯಾಯಾಮವನ್ನು ಆರಿಸಿ. ಎಲ್ಲಾ ವ್ಯಾಯಾಮಗಳು ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನವನ್ನು ಒಳಗೊಂಡಿವೆ.',
      backButton: 'ಹಿಂದೆ',
      startButton: 'ಪ್ರಾರಂಭಿಸಿ',
      stopButton: 'ನಿಲ್ಲಿಸಿ',
      exercises: {
        '478': {
          name: '4-7-8 ಉಸಿರಾಟ',
          desc: 'ನರಮಂಡಲವನ್ನು ಶಾಂತಗೊಳಿಸಲು ಡಾ. ವೈಲ್ ಅವರ ತಂತ್ರ.',
        },
        box: {
          name: 'ಬಾಕ್ಸ್ ಉಸಿರಾಟ',
          desc: 'ಒತ್ತಡವನ್ನು ನಿರ್ವಹಿಸಲು 4-ಸೆಕೆಂಡ್ ಮಧ್ಯಂತರಗಳೊಂದಿಗೆ ನೇವಿ ಸೀಲ್ ವಿಧಾನ.',
        },
        resonant: {
          name: 'ಅನುರಣನ ಉಸಿರಾಟ',
          desc: 'ಹೃದಯ ಬಡಿತದ ವ್ಯತ್ಯಾಸವನ್ನು ಸುಧಾರಿಸಲು 5-6 ಉಸಿರಾಟ/ನಿಮಿಷದಲ್ಲಿ ಉಸಿರಾಡಿ.',
        },
        pmr: {
          name: 'ಪ್ರಗತಿಶೀಲ ಸ್ನಾಯು ವಿಶ್ರಾಂತಿ',
          desc: 'ಸ್ನಾಯು ಗುಂಪುಗಳನ್ನು ಬಿಗಿಗೊಳಿಸುವ ಮತ್ತು ವಿಶ್ರಾಂತಿ ಮಾಡುವ 10-ಹಂತದ ಮಾರ್ಗದರ್ಶಿ ಪ್ರಕ್ರಿಯೆ.',
        },
        visualization: {
          name: 'ಮಾರ್ಗದರ್ಶಿ ದೃಶ್ಯೀಕರಣ',
          desc: 'ನಿಮ್ಮ ಮನಸ್ಸನ್ನು ವಿಶ್ರಾಂತಿ ಮಾಡಲು 7 ಶಾಂತಿಯುತ ದೃಶ್ಯಗಳ ಮೂಲಕ ಪ್ರಯಾಣಿಸಿ.',
        },
        scan: {
          name: 'ದೇಹ ಸ್ಕ್ಯಾನ್ ಧ್ಯಾನ',
          desc: 'ತಲೆಯಿಂದ ಪಾದದವರೆಗೆ 18-ಭಾಗಗಳ ಮನಸ್ಸಿನ ಅರಿವಿನ ಅಭ್ಯಾಸ.',
        },
      },
      steps: {
        breatheIn: '{seconds} ಸೆಕೆಂಡುಗಳ ಕಾಲ ಉಸಿರನ್ನು ಒಳಗೆ ತೆಗೆದುಕೊಳ್ಳಿ.',
        hold: '{seconds} ಸೆಕೆಂಡುಗಳ ಕಾಲ ಹಿಡಿದುಕೊಳ್ಳಿ.',
        breatheOut: '{seconds} ಸೆಕೆಂಡುಗಳ ಕಾಲ ಉಸಿರನ್ನು ಹೊರಗೆ ಬಿಡಿ.',
        complete: 'ವ್ಯಾಯಾಮ ಪೂರ್ಣಗೊಂಡಿದೆ. ಚೆನ್ನಾಗಿ ಮಾಡಿದ್ದೀರಿ.',
        starting: 'ಪ್ರಾರಂಭವಾಗುತ್ತಿದೆ',
        getReady: 'ಸಿದ್ಧರಾಗಿ',
        ready: 'ನೀವು ಸಿದ್ಧರಾದಾಗ.',
      },
    },
    mood: {
      title: 'ಮೂಡ್ ಟ್ರ್ಯಾಕರ್',
      days: 'ಭಾನು,ಸೋಮ,ಮಂಗಳ,ಬುಧ,ಗುರು,ಶುಕ್ರ,ಶನಿ',
      summaryTitle: 'ಮಾಸಿಕ ಸಾರಾಂಶ',
      noData: 'ಈ ತಿಂಗಳಿನ ಮೂಡ್ ಡೇಟಾ ಇಲ್ಲ.',
      modalTitle: '{day} ರಂದು ನಿಮಗೆ ಹೇಗನಿಸಿತು?',
    },
    resources: {
      title: 'ಸಂಪನ್ಮೂಲಗಳು',
      description: 'ಸಹಾಯಕವಾದ ಸಂಪನ್ಮೂಲಗಳ ಸಂಗ್ರಹಿತ ಪಟ್ಟಿ. ನೀವು ಬಿಕ್ಕಟ್ಟಿನಲ್ಲಿದ್ದರೆ, ದಯವಿಟ್ಟು ತಕ್ಷಣದ ಸಹಾಯವನ್ನು ಪಡೆಯಿರಿ.',
      categories: {
        all: 'ಎಲ್ಲಾ',
        crisis: 'ಬಿಕ್ಕಟ್ಟು',
        articles: 'ಲೇಖನಗಳು',
        videos: 'ವೀಡಿಯೊಗಳು',
        podcasts: 'ಪಾಡ್‌ಕಾಸ್ಟ್‌ಗಳು',
      },
    },
    goals: {
      title: 'ನಿಮ್ಮ ಗುರಿಗಳು',
      addNew: 'ಹೊಸ ಗುರಿಯನ್ನು ಸೇರಿಸಿ',
      customPlaceholder: 'ನಿಮ್ಮ ಕಸ್ಟಮ್ ಗುರಿಯನ್ನು ನಮೂದಿಸಿ...',
      addButton: 'ಸೇರಿಸಿ',
      createCustom: 'ಕಸ್ಟಮ್ ಗುರಿಯನ್ನು ರಚಿಸಿ',
      activeGoals: 'ಸಕ್ರಿಯ ಗುರಿಗಳು',
      noGoals: 'ನೀವು ಇನ್ನೂ ಯಾವುದೇ ಗುರಿಗಳನ್ನು ಹೊಂದಿಸಿಲ್ಲ.',
      templates: {
        mindfulness: 'ದೈನಂದಿನ ಸಾವಧಾನತೆ',
        journaling: 'ದೈನಂದಿನ ಜರ್ನಲಿಂಗ್',
        exercise: '30 ನಿಮಿಷಗಳ ವ್ಯಾಯಾಮ',
        sleep: '8 ಗಂಟೆಗಳ ನಿದ್ರೆ ಪಡೆಯಿರಿ',
        gratitude: 'ಕೃತಜ್ಞತೆಯನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ',
        connect: 'ಸ್ನೇಹಿತನೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ',
      },
    }
  },
};