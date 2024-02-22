<h1>ElderPal - Elder Care Connection Platform</h1>

<p>Welcome to <strong>ElderPal</strong> 🌟, an innovative mobile application designed to enhance the caregiving experience for elders. This application is built with the intention of fostering easier communication and emotional understanding between elders, their family members, caregivers, and doctors. ElderPal incorporates advanced features such as speech emotion recognition, a responsive voice assistant, video calling, and chat functionalities tailored to meet the needs of each user category, all powered by cutting-edge machine learning techniques and WebRTC for real-time communication.</p>

<h2>Features</h2>

<h3>Speech Emotion Recognition 🗣️💡</h3>
<ul>
  <li>Utilizes advanced machine learning algorithms to analyze the elder's voice and detect underlying emotions.</li>
  <li>Helps in understanding the emotional state of the elder without explicit communication, enhancing the caregiving process.</li>
</ul>

<h3>Voice Assistant 🤖🗨️</h3>
<ul>
  <li>Engages with elders based on detected emotions, providing a more personalized interaction.</li>
  <li>Powered by natural language processing (NLP) algorithms to understand and respond to a wide range of queries and commands.</li>
</ul>

<h3>Video Call & Chat 📹💬</h3>
<ul>
  <li>Employs WebRTC for seamless, real-time video calls and chat options among elders, family members, caregivers, and doctors.</li>
  <li>Ensures high-quality, low-latency communication with real-time data encryption for privacy and security.</li>
</ul>

<h3>Health Report Management (for Doctors) 📋👨‍⚕️</h3>
<ul>
  <li>Allows doctors to upload and edit health reports for each elder securely.</li>
  <li>Leverages cloud storage solutions for easy access and management of health reports by authorized users.</li>
</ul>

<h2>Machine Learning Techniques and Algorithms 🧠🔍</h2>
<p>ElderCareConnect employs various machine learning techniques and algorithms to provide an intuitive and responsive user experience:</p>
<ul>
  <li><strong>Speech Emotion Recognition:</strong> Uses Convolutional Neural Networks (CNNs) and Recurrent Neural Networks (RNNs) to analyze vocal patterns and infer emotional states from the elder's speech.</li>
</ul>

<h2>Overview of Dataset Information 📊</h2>
<h3>Overview</h3>
<p>In order to enable ElderPal's voice emotion identification function, we utilise an extensive dataset that is intended to capture a broad spectrum of human emotions through speech. Our machine learning algorithms rely heavily on this dataset for accurate and sophisticated emotion detection during training.</p>

<h3>Composition</h3>
<p>Two female actors, ages 26 and 64, recorded their speech using a set of 200 target words in the carrier phrase "Say the word _." Seven distinct emotions were depicted by each actor: neutral, pleasant surprise, anger, contempt, fear, and pleasure. The collection, which includes 2800 audio recordings in total, provides a solid basis for analysing and comprehending emotional speech.</p>

<h3>Structure</h3>
<ul>
  <li>Emotions: Anger, Disgust, Fear, Happiness, Pleasant Surprise, Sadness, Neutral.</li>
  <li>Data Points: 2800 audio files.</li>
  <li>Format: WAV format for high-quality audio analysis.</li>
</ul>
<p>The dataset has been carefully arranged to make accessing and processing it easier. All of the actor's recordings are kept in specific files labelled with their respective emotions. You may locate the audio recordings containing the 200 target words for each displayed emotion in these folders dedicated to distinct emotions.</p>

<h2>Neural Network Architecture</h2>
<p>A Long Short-Term Memory (LSTM) Network serves as the foundation for our speech emotion identification system. The LSTM architecture is selected because it is effective at processing sequential input and has a long retention time, which makes it perfect for speech analysis.</p>
