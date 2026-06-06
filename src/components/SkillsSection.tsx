import React, { memo, useMemo } from "react";
import * as SiIcons from "react-icons/si";
import "./styles/SkillsSection.css";

type Skill = {
  name: string;
  img?: string;
};

const getIconFor = (name: string) => {
  const map: Record<string, string> = {
    Python: "SiPython",
    "Scikit-Learn": "SiScikitlearn",
    TensorFlow: "SiTensorflow",
    XGBoost: "SiXgboost",
    Pandas: "SiPandas",
    NumPy: "SiNumpy",
    SHAP: "SiShap",
    NLP: "SiOpenai",
    "Feature Engineering": "SiCode",
    "Neural Networks": "SiCode",
    Transformers: "SiHuggingface",
    LangChain: "SiLangchain",
    LangGraph: "SiGraphql",
    RAG: "SiOpenai",
    "Hybrid RAG": "SiOpenai",
    GraphRAG: "SiOpenai",
    "Hugging Face": "SiHuggingface",
    ChromaDB: "SiChroma",
    Pinecone: "SiPinecone",
    Groq: "SiGroq",
    "Prompt Engineering": "SiOpenai",
    Embeddings: "SiOpenai",
    "Agentic AI Systems": "SiOpenai",
    FastAPI: "SiFastapi",
    "REST APIs": "SiRest",
    PostgreSQL: "SiPostgresql",
    SQL: "SiMysql",
    Docker: "SiDocker",
    MLOps: "SiMlflow",
    "Model Serving": "SiTensorflow",
    "Data Pipelines": "SiApacheairflow",
    Git: "SiGit",
    GitHub: "SiGithub",
    Vercel: "SiVercel",
    Render: "SiRender",
    "HuggingFace Spaces": "SiHuggingface",
  };

  const key = map[name] || "SiSimpleicons";
  // @ts-ignore
  const icon = (SiIcons as any)[key];
  // If icon isn't available in this react-icons build, return undefined
  return icon || undefined;
};

const SkillCard = memo(({ skill }: { skill: Skill }) => {
  const IconComp = getIconFor(skill.name);
  if (!IconComp) {
    return (
      <div className="skill-card no-icon" role="listitem">
        <div className="skill-only">{skill.name}</div>
      </div>
    );
  }

  return (
    <div className="skill-card" role="listitem">
      <div className="skill-icon" aria-hidden>
        <IconComp size={40} />
      </div>
      <div className="skill-name">{skill.name}</div>
    </div>
  );
});

const SkillsSection: React.FC = () => {
  const categories = useMemo(() => {
    return [
      {
        title: "AI / Machine Learning",
        skills: [
          { name: "Python", img: "/images/python.png" },
          { name: "Scikit-Learn", img: "/images/scikit.png" },
          { name: "TensorFlow", img: "/images/tensorflow.png" },
          { name: "XGBoost", img: "/images/xgboost.svg" },
          { name: "Pandas", img: "/images/pandas.svg" },
          { name: "NumPy", img: "/images/numpy.png" },
          { name: "SHAP", img: "/images/shap.svg" },
          { name: "NLP", img: "/images/nlp.svg" },
          { name: "Feature Engineering", img: "/images/feature.svg" },
          { name: "Neural Networks", img: "/images/nn.svg" },
          { name: "Transformers", img: "/images/transformers.svg" },
        ],
      },
      {
        title: "Generative AI & LLM Engineering",
        skills: [
          { name: "LangChain", img: "/images/langchain.png" },
          { name: "LangGraph", img: "/images/langgraph.svg" },
          { name: "RAG", img: "/images/rag.svg" },
          { name: "Hybrid RAG", img: "/images/hybrid-rag.svg" },
          { name: "GraphRAG", img: "/images/graphrag.svg" },
          { name: "Hugging Face", img: "/images/huggingface.svg" },
          { name: "ChromaDB", img: "/images/chroma.svg" },
          { name: "Pinecone", img: "/images/pinecone.svg" },
          { name: "Groq", img: "/images/groq.svg" },
          { name: "Prompt Engineering", img: "/images/prompt.svg" },
          { name: "Embeddings", img: "/images/embeddings.svg" },
          { name: "Agentic AI Systems", img: "/images/agentic.svg" },
        ],
      },
      {
        title: "Backend, Databases & MLOps",
        skills: [
          { name: "FastAPI", img: "/images/fastapi.svg" },
          { name: "REST APIs", img: "/images/restapi.svg" },
          { name: "PostgreSQL", img: "/images/postgres.svg" },
          { name: "SQL", img: "/images/sql.svg" },
          { name: "Docker", img: "/images/docker.svg" },
          { name: "MLOps", img: "/images/mlops.svg" },
          { name: "Model Serving", img: "/images/modelserving.svg" },
          { name: "Data Pipelines", img: "/images/datapipelines.svg" },
        ],
      },
      {
        title: "Deployment & Development Tools",
        skills: [
          { name: "Git", img: "/images/git.svg" },
          { name: "GitHub", img: "/images/github.svg" },
          { name: "Vercel", img: "/images/vercel.svg" },
          { name: "Render", img: "/images/render.svg" },
          { name: "HuggingFace Spaces", img: "/images/hfspaces.svg" },
        ],
      },
    ];
  }, []);

  const totalSkills = categories.reduce((acc, c) => acc + c.skills.length, 0);

  return (
    <section className="skills-section" id="skills">
      <div className="skills-inner">
        <div className="skills-header">
          <h2>Technical Skills &amp; Expertise</h2>
          <p className="skills-sub">Technologies, frameworks, and tools I use to build production-ready AI systems.</p>

          <div className="highlight-banner" aria-hidden>
            <span className="rocket">🚀</span>
            <strong>Currently Working With</strong>
            <div className="banner-list">FastAPI • LangGraph • PostgreSQL • RAG Systems • Agentic AI • Pinecone • Docker</div>
          </div>
        </div>

        {categories.map((cat) => (
          <div key={cat.title} className="skills-category">
            <h3>{cat.title}</h3>
              <div className="skills-grid" role="list">
                {cat.skills.map((s) => (
                  <SkillCard key={s.name} skill={s} />
                ))}
              </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
