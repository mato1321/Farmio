# ? Farmio - �A�a���Υ��x

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)

**���X AI �޳N�����z���A�a����C�X���x**

[�\��S��](#-�\��S��) ? [�޳N�[�c](#-�޳N�[�c) ? [�ֳt�}�l](#-�ֳt�}�l) ? [�M�׵��c](#-�M�׵��c) ? [API ����](#-api-����)

</div>

---

## ? �M��²��

Farmio �O�@�ӳзs���A�a���Υ��x�A�P�O��z�L AI �޳N���ɹA�a�ϥήĲv�A�P�i�A�~�귽������o�i�C�ڭ̬��A�a�֦��̻P�ݨD�̷f�ؤ@�y���١A���A�~�귽�o�H�󦳮Ħa�t�m�P�Q�ΡC

### ? �֤߻���

- **���z�C�X**�G�B�� AI �t��k��ǰt��A�a�ѻ�
- **�Y�ɿԸ�**�G��X Ollama AI �ҫ����� 24/7 �A�~�ԸߪA��
- **�귽�u��**�G���ɹA�a�Q�βv�A��ֶ��m�귽
- **����o�i**�G�P�i�A�~�귽�����Ĵ`���P�i����Q��

---

## ? �\��S��

### ? �A�a����
- **�ڭn���a**�G�s���i����A�a�A�d�ݸԲӸ�T�P�a�z��m
- **�ڭn�X��**�G���P�Z�n�A�a�X����T
- **���z�j�M**�G�ھڦa�ϡB���n�B���浥����z��

### ? AI �A�~�U��
- **�Y�ɹ��**�G�䴩�c�餤�媺 AI ��Ѿ����H
- **�M�~�Ը�**�G�A�a�޲z�B�@���شӡB�A��ϥε��M�~��ĳ
- **���v�O��**�G�O�d��ܯߵ��A���ѳs�e���Ը�����
- **���a���p**�G�ϥ� Ollama + Qwen2 �ҫ��A�T�O�ƾ����p

### ? ���s����
- **�Q�װ�**�G�A����y�g��P�߱o
- **���Ѯw**�G�J��A�~�������ѻP�޳N�峹

### ? ���~�X�@
- ���~��T��X�P�X�@���

---

## ? �޳N�[�c

### �e�ݧ޳N��

```
React 18.3         - UI �ج[
TypeScript 5.8     - �����w��
Vite 5.4          - �c�ؤu��
TailwindCSS 3.4   - �˦��ج[
Shadcn/UI         - ����w
React Router 6.30  - ���Ѻ޲z
React Query 5.83   - �ƾڪ��A�޲z
Lucide React      - �ϼЮw
```

### ��ݧ޳N��

```
FastAPI           - Python Web �ج[
Uvicorn           - ASGI �A�Ⱦ�
Pydantic          - �ƾ�����
httpx             - �D�P�B HTTP �Ȥ��
```

### AI �޳N

```
Ollama            - ���a LLM �B������
Qwen2:latest      - �����ڤڤd�ݤj�y���ҫ�
```

---

## ? �ֳt�}�l

### �t�λݨD

- **Node.js** >= 18.0.0
- **Python** >= 3.11
- **Ollama** (�Ω� AI �\��)

### �w�˨B�J

#### 1. �J���M��

```bash
git clone https://github.com/mato1321/agri-rent-finder.git
cd agri-rent-finder
```

#### 2. �w�˫e�ݨ̿�

```bash
npm install
```

#### 3. �w�� Ollama �P AI �ҫ�

```bash
# �w�� Ollama (�X�� https://ollama.ai �U���w�˵{��)

# �U�� Qwen2 �ҫ�
ollama pull qwen2:latest

# �Ұ� Ollama �A��
ollama serve
```

#### 4. �]�w�������

```bash
cd backend

# �إߵ�������
python -m venv venv

# �Ұʵ�������
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# �w�˨̿�
pip install -r requirements.txt

# �إ������ܼ��ɮ�
cp .env.example .env
```

�s�� `.env` �ɮסG

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2:latest
API_HOST=0.0.0.0
API_PORT=8000
```

#### 5. �ҰʪA��

**�׺ݾ� 1 - Ollama �A��**
```bash
ollama serve
```

**�׺ݾ� 2 - ��� API**
```bash
cd backend
python run.py
```

**�׺ݾ� 3 - �e������**
```bash
npm run dev
```

#### 6. �X������

- **�e������**: http://localhost:5173
- **��� API**: http://localhost:8000
- **API ����**: http://localhost:8000/docs

---

## ? �M�׵��c

```
agri-rent-finder/
�u�w�w src/                      # �e�ݷ��X
�x   �u�w�w components/           # React ����
�x   �x   �u�w�w Hero.tsx         # �D�e���^���϶�
�x   �x   �u�w�w Header.tsx       # �����ɯ�
�x   �x   �u�w�w Footer.tsx       # ����
�x   �x   �u�w�w FloatingButtons.tsx  # AI �U��B�ʫ��s
�x   �x   �|�w�w ui/              # Shadcn UI ����
�x   �u�w�w pages/               # �����ե�
�x   �x   �u�w�w Index.tsx        # ����
�x   �x   �u�w�w Farmland.tsx     # �A�a�C��
�x   �x   �u�w�w Member.tsx       # �|������
�x   �x   �|�w�w Forum.tsx        # �Q�װ�
�x   �u�w�w App.tsx              # ���ΥD�J�f
�x   �|�w�w main.tsx             # React �J�f
�x
�u�w�w backend/                  # ��ݷ��X
�x   �u�w�w app/
�x   �x   �u�w�w main.py          # FastAPI ���ΥD�{��
�x   �x   �u�w�w config.py        # �t�m�޲z
�x   �x   �u�w�w api/             # API ����
�x   �x   �x   �|�w�w routes/
�x   �x   �x       �|�w�w chat.py  # AI ��� API
�x   �x   �u�w�w services/        # �~���޿�
�x   �x   �x   �|�w�w ollama.py    # Ollama �A�Ⱦ�X
�x   �x   �|�w�w schemas/         # Pydantic �ƾڼҫ�
�x   �x       �|�w�w chat.py      # ��Ѭ����ҫ�
�x   �u�w�w requirements.txt     # Python �̿�
�x   �|�w�w run.py              # �Ұʸ}��
�x
�u�w�w public/                  # �R�A�귽
�u�w�w package.json            # �e�ݨ̿�t�m
�u�w�w tsconfig.json           # TypeScript �t�m
�u�w�w tailwind.config.ts      # TailwindCSS �t�m
�u�w�w vite.config.ts          # Vite �t�m
�|�w�w README.md               # �M�׻������
```

---

## ? API ����

### AI ��Ѻ��I

#### POST `/api/chat/`

�P AI �A�~�U��i����

**�ШD��**
```json
{
  "message": "����O���_�شӪ��̨Ωu�`�H",
  "history": [
    {
      "type": "bot",
      "text": "�z�n�I�ڬO�A�~�p�U��"
    },
    {
      "type": "user",
      "text": "�A�n"
    }
  ]
}
```

**�^��**
```json
{
  "answer": "���_�شӪ��̨Ωu�`�q�`�O�K�u...",
  "status": "success"
}
```

#### GET `/api/chat/health`

�ˬd API �A�Ȫ��A

**�^��**
```json
{
  "status": "healthy",
  "service": "Farmio AI Chat API",
  "model": "qwen2:latest"
}
```

�Բ� API ���ɽгX�ݡGhttp://localhost:8000/docs

---

## ? UI/UX �]�p�S�I

- **�T�����]�p**�G�����䴩�ୱ�B���O�B������U�ظ˸m
- **�t��D�D��ѵ���**�G�`��b�z���]�p�A������ĪG
- **�y�Z�ʵe**�G���ƪ��L��ĪG���ɥΤ�����
- **�L��ê�䴩**�G��` WCAG �L��ê�]�p�W�d

---

## ? �}�o���O

```bash
# �}�o�Ҧ�
npm run dev

# �Ͳ��c��
npm run build

# �w���Ͳ�����
npm run preview

# �{���X�ˬd
npm run lint

# ��ݶ}�o�Ҧ��]�۰ʭ����^
cd backend && python run.py
```

---

## ? �^�m���n

�w�ﴣ�� Issue �� Pull Request�I

1. Fork ���M��
2. �إߥ\����� (`git checkout -b feature/AmazingFeature`)
3. �����ܧ� (`git commit -m 'Add some AmazingFeature'`)
4. ���e����� (`git push origin feature/AmazingFeature`)
5. �}�� Pull Request

---

## ? �}�o���u��

- [x] ��¦���x�[�c
- [x] AI �A�~�U���X
- [x] �A�a�C��P�j�M
- [ ] �Τ�{�Ҩt�Ρ]JWT�^
- [ ] �A�a�ԲӸ�T����
- [ ] �u�W�w���P�X���޲z
- [ ] PostgreSQL �ƾڮw��X
- [ ] Redis �w�s�t��
- [ ] ��I�t�ξ�X
- [ ] ��� App �}�o

---

## ? ���v

���M�ױĥΨp�����v�A���g�\�i���o�ƻs�B�����έק�C

---

## ? �ζ�

- **�}�o��**: [@mato1321](https://github.com/mato1321)

---

## ? �p���ڭ�

�p��������D�Ϋ�ĳ�A�w��z�L�H�U�覡�p���G

- GitHub Issues: [������D](https://github.com/mato1321/agri-rent-finder/issues)
- Email: your-email@example.com

---

<div align="center">

**�ά�޽��A�~�A���C�@���g�a���o���̤j����** ?

Made with ?? by Farmio Team

</div>