import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCirclePlus, faPhone } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { ContentLayout } from "../layouts";
import { SkillForm } from "../forms";
import { faInstagram, faSquareFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { DataUser, SkillUser } from "../types";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { CardAddress, CardUserInfo } from "../components";

const MySwal = withReactContent(Swal);

const INITIAL_STATE: DataUser = {
  cedula_Profesional: "",
  direccion: "",
  direccionID: 0,
  estatusCarrera: "",
  fechaEgreso: "",
  id: 0,
  porcentaje_Cursado: "",
  sexo: "",
  userApellido: "",
  userBirthDate: "",
  userBoleta: null,
  userCurp: "",
  userEmail: null,
  userEstatusCarreraId: 0,
  userName: "",
  userPass: "",
  userPhone: "",
  userSexoId: 0,
};

export const ProfilePage = () => {
  const [user, setUser] = useState(INITIAL_STATE);
  const [skillsUser, setSkillsUser] = useState<SkillUser[]>([]);

  useEffect(() => {
    axios
      .post("/consulta_estudiante", {
        id: localStorage.getItem("idUser"),
      })
      .then((data) => {
        console.log("success", data);
        setUser(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios
      .post("/consulta_estudiante_tag", {
        id: localStorage.getItem("idUser"),
      })
      .then((data) => {
        console.log("success", data);
        setSkillsUser(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <ContentLayout>
      <div className="w-4/5 mx-auto py-16">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="bg-white rounded-md p-4">
              <img
                src="./img/Homer.jpg"
                alt="Profile"
                width="200"
                height="200"
                className="block mx-auto my-5 rounded-full"
              />
              <div className="text-xl font-bold text-center">
                {user.userName} {user.userApellido}
              </div>
              {/* <div className="text-center">Ingeniería en Sistemas</div> */}
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Contacto</div>
              <div className="flex items-center mt-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-lg mr-2" />
                <div>{user.userEmail}</div>
              </div>
              <div className="flex items-center mt-2">
              <FontAwesomeIcon icon={faPhone} className="text-lg mr-2" />
                <div>{user.userPhone}</div>
              </div>
              <div className="flex justify-center mt-2">
                <FontAwesomeIcon icon={faSquareFacebook} className="text-3xl text-facebook mx-2" />
                <FontAwesomeIcon icon={faXTwitter} className="text-3xl text-x-twitter mx-2" />
                <FontAwesomeIcon icon={faInstagram} className="text-3xl text-instagram mx-2" />
              </div>
            </div>
            <CardAddress type="alumno" />
            {/* <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">Idiomas</div>
              <div className="mt-2">
                <div>Español</div>
                <div>Inglés</div>
                <div>Alemán</div>
              </div>
            </div> */}
          </div>
          <div className="col-span-2">
            <CardUserInfo titulo="Skills" data={skillsUser} formCreate={<SkillForm />} keyName="descripcion" />
            {/* <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">
                Extra Skills
              </div>
              <div className="mt-1">
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 1
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 2
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 3
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 4
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Habilidad 5
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">
                Certificaciones
              </div>
              <div className="mt-1">
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Certificación 1
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Certificación 2
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">
                Expreriencia Laboral
              </div>
              <div className="mt-1">
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Empleo 1
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Empleo 2
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md p-4 mt-6">
              <div className="text-xl text-politectico font-bold">
                Proyectos Destacados
              </div>
              <div className="mt-1">
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Proyecto 1
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Proyecto 2
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-circle text-[.4rem] mr-1"></i>{" "}
                  Proyecto 3
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};
