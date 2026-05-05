import { useEffect, useState } from "react";
import { motorTypeOptions, serviceOptions } from "../data/mockData";

const blankErrors = {
  name: "",
  phone: "",
  address: "",
  age: "",
  motorType: "",
  licensePlate: "",
  serviceType: "",
};

const normalizePlate = (plate) => plate.toUpperCase().replace(/\s+/g, " ").trim();

export default function ProfileForm({
  initialValues,
  onSaveProfile,
  onSaveAndQueue,
  queueLocked,
}) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    address: "",
    age: "",
    motorType: "",
    licensePlate: "",
    serviceType: "",
    customService: "",
  });
  const [errors, setErrors] = useState(blankErrors);

  useEffect(() => {
    const initialService = initialValues?.serviceType ?? "";
    const isCustom = initialService && !serviceOptions.includes(initialService) && initialService !== "Lainnya";

    setValues({
      name: initialValues?.name ?? "",
      phone: initialValues?.phone ?? "",
      address: initialValues?.address ?? "",
      age: initialValues?.age ?? "",
      motorType: initialValues?.motorType ?? "",
      licensePlate: initialValues?.licensePlate ?? "",
      serviceType: isCustom ? "Lainnya" : initialService,
      customService: isCustom ? initialService : "",
    });
  }, [initialValues]);

  const validate = () => {
    const nextErrors = { ...blankErrors };

    if (!values.name.trim()) nextErrors.name = "Nama lengkap wajib diisi.";
    if (!values.phone.trim()) nextErrors.phone = "Nomor HP wajib diisi.";
    if (!values.address.trim()) nextErrors.address = "Alamat wajib diisi.";
    if (!values.age || Number(values.age) < 15) nextErrors.age = "Umur minimal 15 tahun.";
    if (!values.motorType.trim()) nextErrors.motorType = "Jenis motor wajib diisi.";
    if (!values.licensePlate.trim()) {
      nextErrors.licensePlate = "Plat nomor wajib diisi.";
    }
    if (!values.serviceType.trim()) {
      nextErrors.serviceType = "Keperluan atau keluhan wajib dipilih.";
    } else if (values.serviceType === "Lainnya" && !values.customService.trim()) {
      nextErrors.serviceType = "Harap masukkan detail keperluan atau keluhan Anda.";
    }

    setErrors(nextErrors);
    return Object.values(nextErrors).every((value) => !value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: name === "licensePlate" ? normalizePlate(value) : value,
    }));
  };

  const submitProfile = (mode) => {
    if (!validate()) {
      return;
    }

    const normalizedValues = {
      ...values,
      age: Number(values.age),
      licensePlate: normalizePlate(values.licensePlate),
      serviceType: values.serviceType === "Lainnya" && values.customService.trim() 
                   ? values.customService.trim() 
                   : values.serviceType,
    };
    
    // Remove customService from the final payload to avoid cluttering the data model
    delete normalizedValues.customService;

    if (mode === "queue") {
      onSaveAndQueue(normalizedValues);
      return;
    }

    onSaveProfile(normalizedValues);
  };

  return (
    <div className="glass-panel p-6 sm:p-8">
      <div>
        <p className="section-heading">Profil Pelanggan</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
          Lengkapi data servis Anda
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Form ini dipakai sebagai dasar pengambilan nomor antrian. Data akan disimpan
          lokal melalui state mock dan siap dihubungkan ke API phase 2.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Nama Lengkap
          <input
            className="field-shell"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Contoh: Budi Santoso"
          />
          {errors.name ? <span className="mt-2 block text-rose-600">{errors.name}</span> : null}
        </label>

        <label className="text-sm font-medium text-slate-700">
          Nomor HP
          <input
            className="field-shell"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
            type="tel"
          />
          {errors.phone ? (
            <span className="mt-2 block text-rose-600">{errors.phone}</span>
          ) : null}
        </label>

        <label className="text-sm font-medium text-slate-700 md:col-span-2">
          Alamat
          <textarea
            className="field-shell min-h-[120px]"
            name="address"
            value={values.address}
            onChange={handleChange}
            placeholder="Masukkan alamat lengkap"
          />
          {errors.address ? (
            <span className="mt-2 block text-rose-600">{errors.address}</span>
          ) : null}
        </label>

        <label className="text-sm font-medium text-slate-700">
          Umur
          <input
            className="field-shell"
            name="age"
            value={values.age}
            onChange={handleChange}
            placeholder="Contoh: 32"
            type="number"
            min="15"
          />
          {errors.age ? <span className="mt-2 block text-rose-600">{errors.age}</span> : null}
        </label>

        <label className="text-sm font-medium text-slate-700">
          Jenis Motor
          <input
            list="motor-type-options"
            className="field-shell"
            name="motorType"
            value={values.motorType}
            onChange={handleChange}
            placeholder="Pilih atau ketik jenis motor"
          />
          <datalist id="motor-type-options">
            {motorTypeOptions.map((motorType) => (
              <option key={motorType} value={motorType} />
            ))}
          </datalist>
          {errors.motorType ? (
            <span className="mt-2 block text-rose-600">{errors.motorType}</span>
          ) : null}
        </label>

        <label className="text-sm font-medium text-slate-700">
          Plat Nomor
          <input
            className="field-shell"
            name="licensePlate"
            value={values.licensePlate}
            onChange={handleChange}
            placeholder="Contoh: D 1234 AB"
          />
          {errors.licensePlate ? (
            <span className="mt-2 block text-rose-600">{errors.licensePlate}</span>
          ) : null}
        </label>

        <fieldset className="text-sm font-medium text-slate-700 md:col-span-2">
          <legend>Keperluan atau Keluhan</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceOptions.map((service) => (
              <label
                key={service}
                className={`rounded-2xl border px-4 py-3 transition cursor-pointer flex items-center gap-2 ${
                  values.serviceType === service
                    ? "border-brand-300 bg-brand-50 text-brand-800"
                    : "border-slate-200 bg-white text-slate-700 hover:border-brand-200"
                }`}
              >
                <input
                  className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                  name="serviceType"
                  type="radio"
                  value={service}
                  checked={values.serviceType === service}
                  onChange={handleChange}
                />
                {service}
              </label>
            ))}
          </div>
          
          {values.serviceType === "Lainnya" && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <input
                className="field-shell"
                type="text"
                name="customService"
                value={values.customService}
                onChange={handleChange}
                placeholder="Tuliskan keperluan atau keluhan Anda secara spesifik..."
                autoFocus
              />
            </div>
          )}

          {errors.serviceType ? (
            <span className="mt-2 block text-rose-600">{errors.serviceType}</span>
          ) : null}
        </fieldset>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={() => submitProfile("save")} className="secondary-button">
          Simpan Profil
        </button>
        <button
          type="button"
          onClick={() => submitProfile("queue")}
          className="primary-button"
          disabled={queueLocked}
        >
          {queueLocked ? "Antrian Hari Ini Sudah Ada" : "Simpan & Ambil Nomor Antrian"}
        </button>
      </div>
    </div>
  );
}
