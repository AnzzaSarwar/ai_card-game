import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMagic } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs';
import { BsPencilFill } from 'react-icons/bs'; // For edit icon

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default function RulesGenerator() {
  const [form, setForm] = useState({
    name: '',
    prompt_for_rules: '',
    difficulty_level: '',
    game_roles: 1,
  });

  const [result, setResult] = useState<string | null | any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await axios.post('http://52.203.31.162:5001/api/rules', form, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(res.data.data._id);
      setResult(res.data.data.rules_data);
      console.log(res.data.data.rules_data);

    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error creating ruleset');
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="rules-page">
    <DashboardContent maxWidth="xl" sx={{ color: '#fff', px: { xs: 2, sm: 3, md: 5 } }}>

      {/* Heading */}
      <div className="page-heading">
        <h1>AI Rules Generator</h1>
        <p>Generate game rules instantly using AI suggestions</p>
      </div>

      {/* Form Sections */}
      <form className="rules-form" onSubmit={handleSubmit} >
        <div className="rules-form"  >
          {/* style={{paddingRight: '20px', }} */}
          {/* Describe your game */}
          <div className="input-box">
            <div className="input-left">
              <label className="input-label">Name</label>
              {/* <div className="input-field">
              <span>Mathematics learning game for school children</span>
            </div> */}
              <input type="text" name='name' onChange={handleChange} value={form.name} placeholder='Mathematics learning game for school children' className='input-field' required />
            </div>
          </div>
          <div className="input-box">
            <div className="input-left">
              <label className="input-label">Prompt for Rules:</label>
              {/* <div className="input-field" required>
              <span>Mathematics learning game for school children</span>
            </div> */}
              <input type="text" name='prompt_for_rules' onChange={handleChange} value={form.prompt_for_rules} placeholder='Mathematics learning game for school children' className='input-field' required />
            </div>
          </div>
        </div>

        {/* Difficulty + Game Roles */}
        <div className="input-box">
          <div className="input-left">
            <label className="input-label">Difficulty levels</label>
            {/* <div className="input-field" required>
              <span>Expert</span>
            </div> */}
            <input type="text" name='difficulty_level' onChange={handleChange} value={form.difficulty_level} placeholder='Expert' className='input-field' required />
          </div>
          <div className="input-right">
            <label className="input-label">Games Roles</label>
            {/* <div className="input-field" required>
              <span>10</span>
            </div> */}
            <input type="text" placeholder='10' name='game_roles' onChange={handleChange} value={form.game_roles} className='input-field' required />


          </div>
          <button type='submit' disabled={loading} className="generate-button">
            <span>    {loading ? 'Creating...' : 'Create RuleSet'}
            </span>
            <FaMagic className="magic-icon" />
          </button>
        </div>
      </form>

        {result ? (
          <>
          <div className="info-boxes" style={{marginTop: '25px'}}>
            {
              result.map((item: any, index: number) => (
                  <div className="info-box">
                <div className="info-header">
                  <h2>{item.heading}</h2>
                </div>
                <p>
                  {item.description}
                </p>
              </div>
              ))
            }
              {/* Section 1 - Game Mechanics */}
              {/* <div className="info-box">
                <div className="info-header">
                  <h2>Game Mechanics</h2>
                </div>
                <p>
                  Players progress through a virtual map by selecting paths or tasks and solving math
                  problems of varying difficulty, determined by rolling a virtual dice. Instead of
                  combat, they face “Math Challenges,” earning stars, items, or power-ups for correct
                  answers, while incorrect ones may trigger retry penalties or hints. The goal is to
                  reach the final level or collect 100 stars, with victory going to the first player to
                  achieve either — blending learning with strategy and speed.
                </p>
              </div> */}

              {/* Section 2 - Core Gameplay Rules */}
              {/* <div className="info-box">
                <div className="info-header">
                  <h2>Core Gameplay Rules</h2>
                </div>
                <p>
                  Players navigate through a series of levels or zones on a virtual map. Each turn, a
                  player selects a path or task and solves a math problem to proceed. Questions vary by
                  difficulty and topic (e.g., addition, subtraction, multiplication, division,
                  fractions).
                </p>
              </div> */}

              {/* Section 3 - Combat System */}
              {/* <div className="info-box">
                <div className="info-header">
                  <h2>Combat System</h2>
                </div>
                <p>
                  Instead of traditional combat, players face “Math Challenges.” Players roll a virtual
                  dice to determine the difficulty of the problem (easy to hard). Solving a problem
                  correctly allows them to earn points or special items; incorrect answers may result in
                  retry penalties or hints usage.
                </p>
              </div> */}

              {/* Section 4 - Victory Conditions */}
              {/* <div className="info-box">
                <div className="info-header">
                  <h2>Victory Conditions</h2>
                </div>
                <p>
                  The game ends when a player reaches the final level or accumulates a set number of
                  stars (e.g., 100 stars) by solving problems. First player to complete the journey or
                  hit the star goal wins, encouraging both learning speed and accuracy.
                </p>
              </div> */}
            </div>
            <div className="action-buttons">
          <Link to="/editmanually">
            <button className="edit-button">
              <BsPencilFill size={20} />
              <span>Edit Manually</span>
            </button>
          </Link>
          <button className="apply-button">
            <BsCheckLg size={16} />
            <span>Apply Selected Rules</span>
          </button>
        </div>
        </>
        ) : (<h3 style={{ textAlign: 'center' , marginTop: '25px', backgroundColor: '#8a0303', padding: '15px', display: 'block', borderRadius: '12px', border: '3px solid white', borderLeft: '0px', borderRight: '0px' }}>Your Games Rules Will Appear Here</h3>)}
        {error && (
          <div style={{ marginTop: 24, color: '#f87171' }}>
            <b>Error:</b> {error}
          </div>
        )}

        {/* Info Sections */}
        {/* <div className="info-boxes">
          <div className="info-box">
            <div className="info-header">
              <h2>Game Mechanics</h2>
            </div>
            <p>
              Players progress through a virtual map by selecting paths or tasks and solving math
              problems of varying difficulty, determined by rolling a virtual dice. Instead of
              combat, they face “Math Challenges,” earning stars, items, or power-ups for correct
              answers, while incorrect ones may trigger retry penalties or hints. The goal is to
              reach the final level or collect 100 stars, with victory going to the first player to
              achieve either — blending learning with strategy and speed.
            </p>
          </div>

          <div className="info-box">
            <div className="info-header">
              <h2>Core Gameplay Rules</h2>
            </div>
            <p>
              Players navigate through a series of levels or zones on a virtual map. Each turn, a
              player selects a path or task and solves a math problem to proceed. Questions vary by
              difficulty and topic (e.g., addition, subtraction, multiplication, division,
              fractions).
            </p>
          </div>

          <div className="info-box">
            <div className="info-header">
              <h2>Combat System</h2>
            </div>
            <p>
              Instead of traditional combat, players face “Math Challenges.” Players roll a virtual
              dice to determine the difficulty of the problem (easy to hard). Solving a problem
              correctly allows them to earn points or special items; incorrect answers may result in
              retry penalties or hints usage.
            </p>
          </div>

          <div className="info-box">
            <div className="info-header">
              <h2>Victory Conditions</h2>
            </div>
            <p>
              The game ends when a player reaches the final level or accumulates a set number of
              stars (e.g., 100 stars) by solving problems. First player to complete the journey or
              hit the star goal wins, encouraging both learning speed and accuracy.
            </p>
          </div>
        </div> */}

        {/* Action Buttons Section */}
        {/* <div className="action-buttons">
          <Link to="/editmanually">
            <button className="edit-button">
              <BsPencilFill size={20} />
              <span>Edit Manually</span>
            </button>
          </Link>
          <button className="apply-button">
            <BsCheckLg size={16} />
            <span>Apply Selected Rules</span>
          </button>
        </div> */}
      {/* </form> */}
      {/* </div> */}
    </DashboardContent>
  );
}
